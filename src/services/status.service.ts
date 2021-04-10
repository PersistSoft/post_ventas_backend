import { classToPlain } from 'class-transformer';
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
   * Find all
   */
  public findAll = async () => {
    try {
      
      const status = await this.statusRepository.find();
      return classToPlain(status);  

    } catch (error) {
      throw error;
    }
    
  };

  public create = async (status: StatusDto) => {
    try {

      let newStatus = await this.statusRepository.save(status);
      return classToPlain(newStatus);  

    } catch (error) {
      throw error;
    }
  }

  /**
   * Find by id
   */
  public findById = async (id: number) => {
    try {

      const contact = await this.statusRepository.findById(id);

      if(!contact){
        throw `Contact info with id: ${id} doesn't exist.`
      }
      return contact;      

    } catch (error) {
      throw error;
    }
  };
}
