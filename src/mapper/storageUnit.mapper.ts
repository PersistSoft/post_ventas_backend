import { Aparment } from '../database/entities/aparments';

import { StorageUnit } from '../database/entities/storage_unit';
import { StorageUnitDto } from '../dto/storageUnit.dto';

export class StorageUnitMapper {
  public static toEntity(storageUnit: StorageUnitDto, aparment: Aparment): StorageUnit {
    const newStorageUnit = new StorageUnit();

    newStorageUnit.name = storageUnit.name;
    newStorageUnit.aparment = aparment;

    return newStorageUnit;
  }

  public static toOutputDto(storageUnit: StorageUnit): StorageUnitDto {
    const storageUnitDto: StorageUnitDto = {
      id: storageUnit.id,
      name: storageUnit.name,
      aparment_id: storageUnit.aparment.id,
    };

    return storageUnitDto;
  }
}
