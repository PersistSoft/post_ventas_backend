import { getCustomRepository, getConnection } from 'typeorm';
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
}
