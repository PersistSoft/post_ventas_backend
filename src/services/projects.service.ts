import { getCustomRepository, getConnection } from 'typeorm';
import { ProjectDto } from '../dto/project.dto';
import { ProjectRepository } from './../repositories/project.repository';
import { ProjectMapper } from './../mapper/projectType.mapper';
import { classToPlain } from 'class-transformer';
import { Project } from '../database/entities/project';

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = getConnection('postventa').getCustomRepository(ProjectRepository);
  }

  /**
   * Find all projects
   */
  public findAll = async () => {
    try {

      const projects = await this.projectRepository.find();
      return classToPlain(projects);  

    } catch (error) {
      throw error;
    }
  };

  /**
   * Find one by projects
   * @param {number} id project id
   */
  public findById = async (idProject: number) => {
    try {

      const project = await this.projectRepository.findById(idProject);

      if(!project){
        throw `Project with id: ${idProject} doesn't exist`;
      }
      
      return classToPlain(project);

    } catch (error) {
      throw error;
    }
  };

  /**
   * Create a Project
   */
  public create = async (project: ProjectDto) => {
    try {

      let newProject = await this.projectRepository.save(project);
      return classToPlain(newProject) as Project;

    } catch (error) {
      throw error;
    }
  };

  public findByName = async (name: string) => {
    try {
      
      const project = await this.projectRepository.findByName(name);
      return project;

    } catch (error) {
      throw error;
    }
  }
}
