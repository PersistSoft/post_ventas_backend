import { getConnection } from 'typeorm';

import { AparmentRepository } from './../repositories/aparments.repository';

export class AparmentService {
  private aparmentRepository: AparmentRepository;

  constructor() {
    this.aparmentRepository = getConnection('postventa').getCustomRepository(AparmentRepository);
  }

  /**
   * Find all
   */
  public findAll = async () => {
    const aparments = await this.aparmentRepository.find();
    return aparments;
  };

  public findById = async(id: number) => {
    const apartment = await this.aparmentRepository.findById(id);
    return apartment;
  }
}
