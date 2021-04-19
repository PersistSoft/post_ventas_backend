import { EntityRepository, Repository } from 'typeorm';
import { Aparment } from './../database/entities/aparments';

@EntityRepository(Aparment)
export class AparmentRepository extends Repository<Aparment> {
  findById(idAparment: number) {
    return this.findOne({ id: idAparment });
  }
  findByBuildingId(idBuilding: number) {
    return this.find({ where: { building: { id: idBuilding } }, order: { name: 'ASC' } });
  }
}
