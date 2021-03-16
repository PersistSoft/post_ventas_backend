import { getCustomRepository, getConnection } from 'typeorm';
import { ProjectRepository } from './../repositories/project.repository';

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = getConnection('postventa').getCustomRepository(ProjectRepository);
  }

  /**
   * Find all projects
   */
  public findAll = async () => {
    const projects = await this.projectRepository.find();
    return projects;
  };
}
