import { getCustomRepository, getConnection } from 'typeorm';
import { StorageUnitRepository } from '../repositories/storage_unit.repository';

export class StorageUnitService {
  private storageUnitRepository: StorageUnitRepository;

  constructor() {
    this.storageUnitRepository = getConnection('postventa').getCustomRepository(StorageUnitRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const storage_unit = await this.storageUnitRepository.find();
    return storage_unit;
  };
}
