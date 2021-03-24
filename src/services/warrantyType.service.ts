import { getConnection } from 'typeorm';
import { WarrantyTypeDto } from '../dto/warrantyType.dto';
import { WarrantyTypeMapper } from '../mapper/warrantyType.mapper';
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

  public create = async (warrantyType: WarrantyTypeDto) => {
    let newWarrantyType = WarrantyTypeMapper.toEntity(warrantyType);
    
    newWarrantyType = await this.warrantyTypeRepository.save(newWarrantyType);

    return WarrantyTypeMapper.toOutputDto(newWarrantyType);
  }
}
