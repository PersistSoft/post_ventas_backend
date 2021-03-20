import { EntityRepository, Repository } from 'typeorm';
import { WarrantyType } from '../database/entities/warrantyType';

@EntityRepository(WarrantyType)
export class WarrantyTypeRepository extends Repository<WarrantyType> {}
