import { EntityRepository, Repository } from 'typeorm';
import { StorageUnit } from '../database/entities/storage_unit';

@EntityRepository(StorageUnit)
export class StorageUnitRepository extends Repository<StorageUnit> {}
