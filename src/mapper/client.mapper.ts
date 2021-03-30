import { Client } from '../database/entities/client';
import { ClientDto } from '../dto/client.dto';

export class ClientMapper {
  public static toEntity(clientDto: ClientDto): Client {
    const client = new Client();

    client.name = clientDto.name;
    client.lastname = clientDto.lastname;
    client.email = clientDto.email;
    client.phone = clientDto.phone;
    client.dataController = clientDto.dataController;

    return client;
  }

  public static toOutputDto(client: Client): ClientDto {
    const clientDto: ClientDto = {
      id: client.id,
      name: client.name,
      lastname: client.name,
      email: client.email,
      phone: client.phone,
      dataController: client.dataController,
    };

    return clientDto;
  }
}
