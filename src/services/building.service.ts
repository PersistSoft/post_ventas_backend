import { getCustomRepository, getConnection } from 'typeorm';
import { BuildingRepository } from '../repositories/buildings.repository';

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
}
