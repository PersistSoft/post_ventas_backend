import { classToPlain } from 'class-transformer';
import { getConnection } from 'typeorm';
import { ContactInfoDto } from '../dto/contactInfo.dto';
import { ContactInfoMapper } from '../mapper/contactInfo.mapper';
import { ContactInfoRepository } from '../repositories/contactInfo.repository';

export class ContactInfoService {
  private contactInfoRepository: ContactInfoRepository;

  constructor() {
    this.contactInfoRepository = getConnection('postventa').getCustomRepository(
      ContactInfoRepository
    );
  }

  /**
   * Find all contacts
   */
  public findAll = async () => {
    try {
      const contacts = await this.contactInfoRepository.find();
      return classToPlain(contacts);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create
   * @param contactInfoDto
   */
  public create = async (contactInfoDto: ContactInfoDto) => {
    try {
      console.log('contactinfo server', contactInfoDto);
      let newContactInfo = await this.contactInfoRepository.save(
        contactInfoDto
      );
      return classToPlain(newContactInfo);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Find by id
   */
  public findById = async (id: number) => {
    try {
      const contact = await this.contactInfoRepository.findById(id);
      return classToPlain(contact);
    } catch (error) {
      throw error;
    }
  };
}
