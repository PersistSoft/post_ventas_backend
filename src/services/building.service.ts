import { classToPlain } from 'class-transformer';
import { getCustomRepository, getConnection } from 'typeorm';
import { BuildingDto } from '../dto/building.dto';
import { ProjectDto } from '../dto/project.dto';
import { BuildingRepository } from '../repositories/buildings.repository';
import { BuildingMapper } from './../mapper/building.mapper';
import { ProjectService } from './projects.service';

export class BuildingService {
  private buildingRepository: BuildingRepository;
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
    this.buildingRepository = getConnection('postventa').getCustomRepository(BuildingRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    try {
      
      const buildings = await this.buildingRepository.find();
      return classToPlain(buildings);

    } catch (error) {
      throw error;
    }
  };
  /**
   * @param {number} id building id
   */
  public findById = async (idBuilding: number) => {
    try {
      
      const building = await this.buildingRepository.findById(idBuilding);

      if(!building){
        throw `Building with id: ${idBuilding} doesn't exist.`;
      }

      return building;  

    } catch (error) {
      throw error;
    }
  };

  /**
   * Create a new Building
   */
  public create = async (building: BuildingDto) => {
    
    try {

      const project = this.projectService.findById(building.project.id);
      
      let newBuildingType = await this.buildingRepository.save(building);
      return classToPlain(newBuildingType);  

    } catch (error) {
      throw error; 
    }
    
  };
}
