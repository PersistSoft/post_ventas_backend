import { Project } from '../database/entities/project';
import { ProjectDto } from '../dto/project.dto';

export class ProjectMapper {
  public static toEntity(projectDto: ProjectDto): Project {
    const project = new Project();

    project.name = projectDto.name;
    project.address = projectDto.address;

    return project;
  }

  public static toOutputDto(project: Project): ProjectDto {
    const projectDto: ProjectDto = {
      id: project.id,
      name: project.name,
      address: project.address,
    };

    return projectDto;
  }
}
