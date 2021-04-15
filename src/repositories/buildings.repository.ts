import { EntityRepository, Repository } from 'typeorm';
import { Building } from './../database/entities/building';

@EntityRepository(Building)
export class BuildingRepository extends Repository<Building> {
  findById(idBuilding: number) {
    return this.findOne({ id: idBuilding });
  }

  findByProjectId(idProject) {
    return this.find({ where: { project: { id: idProject } } });
  }
}
