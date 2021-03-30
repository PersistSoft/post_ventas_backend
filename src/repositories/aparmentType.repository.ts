import { EntityRepository, Repository } from 'typeorm';
import { AparmentType } from './../database/entities/aparmentType';

@EntityRepository(AparmentType)
export class AparmentTypeRepository extends Repository<AparmentType> {
  findById(idType: number) {
    console.log('apartmentType', idType);
    return this.findOne({ id: idType });
  }
}
