import { EntityRepository, Repository } from 'typeorm';
import { StorageUnit } from '../database/entities/storage_unit';

@EntityRepository(StorageUnit)
export class StorageUnitRepository extends Repository<StorageUnit> {
  findById(idStorage: number) {
    return this.findOne({ id: idStorage });
  }

  findByName(name: string) {
    return this.findOne({ name: name});
  }
}
