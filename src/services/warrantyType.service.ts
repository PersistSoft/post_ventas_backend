import { classToPlain } from 'class-transformer';
import { getConnection } from 'typeorm';
import { WarrantyTypeDto } from '../dto/warrantyType.dto';
import { WarrantyTypeRepository } from './../repositories/warrantyType.repository';

export class WarrantyTypeService {
  private warrantyTypeRepository: WarrantyTypeRepository;

  constructor() {
    this.warrantyTypeRepository = getConnection('postventa').getCustomRepository(WarrantyTypeRepository);
  }

  /**
   * Find all
   */
  public findAll = async () => {
    try {

      const warrantiesTypes = await this.warrantyTypeRepository.find();
      return classToPlain(warrantiesTypes);  

    } catch (error) {
      throw error;
    }
    

  };

  /**
   * Create
   * @param warrantyType 
   */
  public create = async (warrantyType: WarrantyTypeDto) => {
    try {

      let newWarrantyType = await this.warrantyTypeRepository.save(warrantyType);
      return classToPlain(newWarrantyType);  

    } catch (error) {
      throw error;
    }
    

  }

  public findByIds = async (ids: number[]) => {
    try {

      const warrantyTypes = await this.warrantyTypeRepository.findByIds(ids);
      return classToPlain(warrantyTypes);

    } catch (error) {
      throw error;
    }
  }
}
