import { EntityRepository, Repository } from 'typeorm';
import { Warranty } from './../database/entities/warranty';

@EntityRepository(Warranty)
export class BuildingRepository extends Repository<Warranty> {}
