import { EntityRepository, Repository } from 'typeorm';
import { Client } from './../database/entities/client';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
