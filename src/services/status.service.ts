import { getCustomRepository, getConnection } from 'typeorm';
import { StatusRepository } from '../repositories/status.repository';

export class StatusService {
  private statusRepository: StatusRepository;

  constructor() {
    this.statusRepository = getConnection('postventa').getCustomRepository(StatusRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const status = await this.statusRepository.find();
    return status;
  };
}
