import { Building } from '../database/entities/building';
import { Project } from '../database/entities/project';
import { BuildingDto } from '../dto/building.dto';
import { ProjectDto } from '../dto/project.dto';

export class BuildingMapper {
  public static toEntity(buildingDto: BuildingDto, project: Project): Building {
    const building = new Building();

    building.name = buildingDto.name;
    building.floors = buildingDto.floors;
    building.aparmentsNumber = buildingDto.aparmentsNumber;
    building.project = project;

    return building;
  }

  public static toOutputDto(building: Building): BuildingDto {
    const buildingDto: BuildingDto = {
      id: building.id,
      name: building.name,
      floors: building.floors,
      aparmentsNumber: building.aparmentsNumber,
      project_id: building.project.id,
    };

    return buildingDto;
  }
}
