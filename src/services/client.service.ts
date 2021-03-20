import { getCustomRepository, getConnection } from 'typeorm';
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
    const clients = await this.clientRepository.find();
    return clients;
  };
}
