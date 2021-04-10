import { classToPlain } from 'class-transformer';
import { getCustomRepository, getConnection } from 'typeorm';
import { ClientDto } from '../dto/client.dto';
import { ClientMapper } from '../mapper/client.mapper';
import { ClientRepository } from '../repositories/clients.repository';

export class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = getConnection('postventa').getCustomRepository(ClientRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    try {

      const clients = await this.clientRepository.find();
      return classToPlain(clients);  

    } catch (error) {
      throw error;
    }
  };
  /**
   *
   */
  public findById = async (idClient: number) => {
    try {

      const client = await this.clientRepository.findById(idClient);

      if(!client){
        throw `Client with id: ${idClient} doesn't exist.`;  
      }

      return classToPlain(client);  

    } catch (error) {
      throw error;
    }
  };

  /**
   * Create a new client
   *
   */
  public create = async (clientDto: ClientDto) => {
    try {

      const newClient = await this.clientRepository.save(clientDto);
      return classToPlain(newClient);

    } catch (error) {
      throw error;
    }
  };
}
