import { EntityRepository, Repository } from 'typeorm';
import { Configuration } from '../config';
import { ContactInfo } from '../database/entities/contractInfo';

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo> {
  findById(id: number) {
    return this.findOne({ id });
  }
}
