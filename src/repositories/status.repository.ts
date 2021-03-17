import { EntityRepository, Repository } from 'typeorm';
import { Status } from './../database/entities/status';

@EntityRepository(Status)
export class BuildingRepository extends Repository<Status> {}
