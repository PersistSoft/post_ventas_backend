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
    const clients = await this.clientRepository.find();
    return clients;
  };
  /**
   *
   */
  public findById = async (idClient: number) => {
    const client = await this.clientRepository.findById(idClient);
    return client;
  };

  /**
   * Create a new client
   *
   */
  public create = async (clientDto: ClientDto) => {
    let newClient = ClientMapper.toEntity(clientDto);

    newClient = await this.clientRepository.save(newClient);

    return ClientMapper.toOutputDto(newClient);
  };
}
