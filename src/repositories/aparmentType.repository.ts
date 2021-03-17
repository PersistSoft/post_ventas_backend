import { EntityRepository, Repository } from 'typeorm';
import { AparmentType } from './../database/entities/aparmentType';

@EntityRepository(AparmentType)
export class AparmentTypeRepository extends Repository<AparmentType> {}
