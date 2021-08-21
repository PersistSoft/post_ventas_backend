import { ContactInfo } from '../database/entities/contactInfo';
import { ContactInfoDto } from '../dto/contactInfo.dto';

export class ContactInfoMapper {
  public static toEntity(contactInfoDto: ContactInfoDto) {}

  public static toOutputDto(contactInfo: ContactInfo) {}
}
