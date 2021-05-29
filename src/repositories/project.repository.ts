import { EntityRepository, Repository } from 'typeorm';
import { Project } from '../database/entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  findById(idProject: number) {
    return this.findOne({ id: idProject });
  }

  findByName(name: string) {
    return this.findOne({ name: name});
  }
}
