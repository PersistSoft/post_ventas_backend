import { EntityRepository, Repository } from 'typeorm';
import { ContactInfo } from '../database/entities/contractInfo';

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo> {}
