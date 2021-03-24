import { getCustomRepository, getConnection } from 'typeorm';
import { StatusDto } from '../dto/status.dto';
import { StatusMapper } from '../mapper/status.mapper';
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

  public create = async (status: StatusDto) => {
    let newStatus = StatusMapper.toEntity(status);
    
    newStatus = await this.statusRepository.save(newStatus);

    return StatusMapper.toOutputDto(newStatus);
  }
}
