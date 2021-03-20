import { getCustomRepository, getConnection } from 'typeorm';

import { AparmentTypeRepository } from './../repositories/aparmentType.repository';

export class AparmentTypeService {
  private aparmentTypeRepository: AparmentTypeRepository;

  constructor() {
    this.aparmentTypeRepository = getConnection('postventa').getCustomRepository(AparmentTypeRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const aparmentsTypes = this.aparmentTypeRepository.find();
    return aparmentsTypes;
  };
}
