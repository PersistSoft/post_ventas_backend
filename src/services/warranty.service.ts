import { classToPlain } from 'class-transformer';
import { getConnection } from 'typeorm';
import { WarrantyDto } from '../dto/warranty.dto';
import { WarrantyMapper } from '../mapper/warranty.mapper';
import { WarrantyRepository } from '../repositories/warranty.repository';
import { AparmentService } from './aparments.service';
import { ContactInfoService } from './contactInfo.service';
import { StatusService } from './status.service';
import { WarrantyTypeService } from './warrantyType.service';

export class WarrantyService {
  private warrantyRepository: WarrantyRepository;
  private apartmentService: AparmentService;
  private contactInfoService: ContactInfoService;
  private statusService: StatusService;
  private warrantyTypeService: WarrantyTypeService;

  constructor() {
    this.warrantyRepository =
      getConnection('postventa').getCustomRepository(WarrantyRepository);
    this.apartmentService = new AparmentService();
    this.contactInfoService = new ContactInfoService();
    this.statusService = new StatusService();
    this.warrantyTypeService = new WarrantyTypeService();
  }

  /**
   *
   */
  public findAll = async () => {
    try {
      const warranties = await this.warrantyRepository.find();
      return classToPlain(warranties);
    } catch (error) {
      throw error;
    }
  };

  public create = async (warranty: WarrantyDto) => {
    try {
      const warrantyTypeIds = warranty.warrantyTypes.map((wt) => wt.id);
      const apartment = await this.apartmentService.findById(
        warranty.aparment.id
      );
      const contactInfo = await this.contactInfoService.findById(
        warranty.contractInfo.id
      );
      const status = await this.statusService.findById(warranty.status.id);
      const warrantyTypes = await this.warrantyTypeService.findByIds(
        warrantyTypeIds
      );

      if (!apartment) {
        throw `Apartment with id:${warranty.aparment.id} doesn't exist.`;
      }

      if (!contactInfo) {
        throw `Contact info with id:${warranty.contractInfo.id} doesn't exist.`;
      }

      if (!status) {
        throw `Status with id:${warranty.status.id} doesn't exist.`;
      }

      if (!warrantyTypes || warrantyTypes.length == 0) {
        throw `Warranty types ${warranty.warrantyTypes} doesn't exist.`;
      }

      const newWarranty = await this.warrantyRepository.save(warranty);
      return classToPlain(newWarranty);
    } catch (error) {
      throw error;
    }
  };
}
