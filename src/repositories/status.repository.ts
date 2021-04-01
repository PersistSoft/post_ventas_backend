import { EntityRepository, Repository } from 'typeorm';
import { Status } from './../database/entities/status';

@EntityRepository(Status)
export class StatusRepository extends Repository<Status> {
  findById(id: number) {
    return this.findOne({ id });
  }
}
