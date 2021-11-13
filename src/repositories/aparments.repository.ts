import { EntityRepository, Like, Repository } from 'typeorm';
import { Aparment } from './../database/entities/aparments';

@EntityRepository(Aparment)
export class AparmentRepository extends Repository<Aparment> {
  findById(idAparment: number) {
    return this.findOne({ id: idAparment });
  }
  
  findByBuildingId(idBuilding: number) {
    return this.find({ where: { building: { id: idBuilding } }, order: { name: 'ASC' } });
  }

  findByBuildingIdAndKeyNull(idBuilding: number) {
    return this.find({ where: { building: { id: idBuilding }, appartmentKey: null }, order: { name: 'ASC' } });
  }

  findByName(name: string) {
    return this.findOne({ name: name});
  }

  findByIdAndkey(request: any) {
    return this.findOne({ id: request.appartmentId, appartmentKey: request.appartmentKey });
  }
}
