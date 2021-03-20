import { EntityRepository, Repository } from 'typeorm';
import { Aparment } from './../database/entities/aparments';

@EntityRepository(Aparment)
export class AparmentRepository extends Repository<AparmentRepository> {}
