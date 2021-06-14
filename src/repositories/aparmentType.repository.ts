import { EntityRepository, Repository } from 'typeorm';
import { AparmentType } from './../database/entities/aparmentType';

@EntityRepository(AparmentType)
export class AparmentTypeRepository extends Repository<AparmentType> {
  findById(idType: number) {
    return this.findOne({ id: idType });
  }

  findByName(name: string) {
    return this.findOne({ type: name});
  }
}
