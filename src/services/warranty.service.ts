import { getConnection } from 'typeorm';
import { WarrantyDto } from '../dto/warranty.dto';
import { WarrantyMapper } from '../mapper/warranty.mapper';
import { WarrantyRepository } from '../repositories/warranty.repository';

export class WarrantyService {
  private warrantyRepository: WarrantyRepository;
  

  constructor() {
    this.warrantyRepository = getConnection('postventa').getCustomRepository(WarrantyRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const warranties = await this.warrantyRepository.find();
    return warranties;
  };

  public create = async (warranty: WarrantyDto) => {
    try {
      
      let newWarranty = await WarrantyMapper.toEntity(warranty);
      newWarranty = await this.warrantyRepository.save(newWarranty);

      return WarrantyMapper.toOutputDto(newWarranty);

    } catch (error) {
      throw error;
    }
  }
}
