import { classToPlain } from 'class-transformer';
import { getCustomRepository, getConnection } from 'typeorm';
import { Aparment } from '../database/entities/aparments';
import { StorageUnit } from '../database/entities/storage_unit';
import { StorageUnitDto } from '../dto/storageUnit.dto';
import { StorageUnitMapper } from '../mapper/storageUnit.mapper';
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
    try {

      const storage_unit = await this.storageUnitRepository.find();
      return classToPlain(storage_unit); 

    } catch (error) {
      throw error;
    }
  };

  /**
   * Create new Parking
   * @param {Aparment}  aparment entity
   */
  public create = async (storageUnit: StorageUnitDto) => {
    try {

      const newStorageUnit = await this.storageUnitRepository.save(storageUnit);
      return classToPlain(newStorageUnit) as StorageUnit;      

    } catch (error) {
      throw error;
    }
  };

  public findByName = async(name: string) => {
    try {
      
      const storageUnit = await this.storageUnitRepository.findByName(name);
      return storageUnit;
      
    } catch (error) {
      throw error;
    }
  }
}
