import { getCustomRepository, getConnection } from 'typeorm';
import { Warranty } from '../database/entities/warranty';
import { WarrantyDto } from '../dto/warranty.dto';
import { WarrantyRepository } from '../repositories/warranty.repository';
import { AparmentService } from './aparments.service';
import { ContactInfoService } from './contactInfo.service';
import { WarrantyTypeService } from './warrantyType.service';

export class WarrantyService {
  private warrantyRepository: WarrantyRepository;
  private contactInfoService: ContactInfoService;
  private statusService: ContactInfoService;
  private warrantyTypeService: WarrantyTypeService;
  private apartmentService: AparmentService;

  constructor() {
    this.warrantyRepository = getConnection('postventa').getCustomRepository(WarrantyRepository);
    this.contactInfoService = new ContactInfoService();
    this.warrantyTypeService = new WarrantyTypeService();
    this.statusService = new ContactInfoService();
    this.apartmentService = new AparmentService();
  }

  /**
   *
   */
  public findAll = async () => {
    const warranties = await this.warrantyRepository.find();
    return warranties;
  };

  public create = async (warranty: WarrantyDto) => {
    const contact = await this.contactInfoService.findById(warranty.contactInfoId);
    if(!contact){
      throw `Contact info id:${warranty.contactInfoId} doesn't exist`;
    }

    const status = await this.statusService.findById(warranty.statusId);
    if(!status){
      throw `Status id:${warranty.statusId} doesn't exist`;
    }

    const apartment = await this.apartmentService.fin

    //const newWarranty = await this.warrantyRepository.create(warranty);
    //return newWarranty;
  }
}
