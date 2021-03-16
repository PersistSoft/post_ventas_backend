import { getCustomRepository, getConnection } from 'typeorm';
import { BuildingRepository } from '../repositories/buildings.repository';

import { AparmentRepository } from './../repositories/aparments.repository';

export class AparmentService {
  private aparmentRepository: AparmentRepository;

  constructor() {
    this.aparmentRepository = getConnection('postventas').getCustomRepository(AparmentRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const aparments = this.aparmentRepository.find();
    return aparments;
  };
}
