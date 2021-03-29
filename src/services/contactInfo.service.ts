import { getConnection } from 'typeorm';
import { ContactInfoDto } from '../dto/contactInfo.dto';
import { ContactInfoMapper } from '../mapper/contactInfo.mapper';
import { ContactInfoRepository } from '../repositories/contactInfo.repository';

export class ContactInfoService {
  private contactInfoRepository: ContactInfoRepository;

  constructor() {
    this.contactInfoRepository = getConnection('postventa').getCustomRepository(ContactInfoRepository);
  }

  /**
   * Find all contacts
   */
  public findAll = async () => {
    const contacts = await this.contactInfoRepository.find();
    return contacts;
  };

  /**
   * Create
   * @param contactInfoDto 
   */
  public create = async (contactInfoDto: ContactInfoDto) => {
    let newContactInfo = ContactInfoMapper.toEntity(contactInfoDto);

    newContactInfo = await this.contactInfoRepository.save(newContactInfo);
    
    return ContactInfoMapper.toOutputDto(newContactInfo);
  }
}
