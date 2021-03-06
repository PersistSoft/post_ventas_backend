import { EntityRepository, Repository } from 'typeorm';
import { ContactInfo } from '../database/entities/contactInfo';

@EntityRepository(ContactInfo)
export class ContactInfoRepository extends Repository<ContactInfo> {
  findById(id: number) {
    return this.findOne({ id });
  }
}
