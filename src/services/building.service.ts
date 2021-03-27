import { getCustomRepository, getConnection } from 'typeorm';
import { BuildingDto } from '../dto/building.dto';
import { ProjectDto } from '../dto/project.dto';
import { BuildingRepository } from '../repositories/buildings.repository';
import { BuildingMapper } from './../mapper/building.mapper';

export class BuildingService {
  private buildingRepository: BuildingRepository;

  constructor() {
    this.buildingRepository = getConnection('postventa').getCustomRepository(BuildingRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const buildings = await this.buildingRepository.find();
    return buildings;
  };

  /**
   * Create a new Building
   */
  public create = async (building: BuildingDto, project) => {
    let newBuildingType = BuildingMapper.toEntity(building, project);
    newBuildingType = await this.buildingRepository.save(newBuildingType);

    return BuildingMapper.toOutputDto(newBuildingType);
  };
}
