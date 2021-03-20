import { getCustomRepository, getConnection } from 'typeorm';
import { WarrantyTypeRepository } from './../repositories/warrantyType.repository';

export class WarrantyTypeService {
  private warrantyTypeRepository: WarrantyTypeRepository;

  constructor() {
    this.warrantyTypeRepository = getConnection('postventa').getCustomRepository(WarrantyTypeRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const warrantiesTypes = await this.warrantyTypeRepository.find();
    return warrantiesTypes;
  };
}
