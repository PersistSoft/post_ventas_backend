import { getCustomRepository, getConnection } from 'typeorm';
import { ProjectDto } from '../dto/project.dto';
import { ProjectRepository } from './../repositories/project.repository';
import { ProjectMapper } from './../mapper/projectType.mapper';

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
  /**
   * Find one by projects
   * @param {number} id project id
   */
  public findById = async (idProject: number) => {
    const project = await this.projectRepository.findById(idProject);
    return project;
  };
  /**
   * Create a Project
   */
  public create = async (project: ProjectDto) => {
    let newProject = ProjectMapper.toEntity(project);
    newProject = await this.projectRepository.save(newProject);

    return ProjectMapper.toOutputDto(newProject);
  };
}
