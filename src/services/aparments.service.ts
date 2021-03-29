import { getConnection } from 'typeorm';

import { AparmentRepository } from './../repositories/aparments.repository';

export class AparmentService {
  private aparmentRepository: AparmentRepository;

  constructor() {
    this.aparmentRepository = getConnection('postventa').getCustomRepository(AparmentRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const aparments = this.aparmentRepository.find();
    return aparments;
  };
}
