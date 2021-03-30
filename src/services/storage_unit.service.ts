import { getCustomRepository, getConnection } from 'typeorm';
import { Aparment } from '../database/entities/aparments';
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
    const storage_unit = await this.storageUnitRepository.find();
    return storage_unit;
  };

  /**
   * Create new Parking
   * @param {Aparment}  aparment entity
   * @param {StorageUnitDtp} StorageUnitDtp building Dto
   */
  public create = async (storageUnit: StorageUnitDto, aparment: Aparment) => {
    let newStorageUnit = StorageUnitMapper.toEntity(storageUnit, aparment);

    newStorageUnit = await this.storageUnitRepository.save(newStorageUnit);

    return StorageUnitMapper.toOutputDto(newStorageUnit);
  };
}
