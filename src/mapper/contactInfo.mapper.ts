import { ContactInfo } from '../database/entities/contractInfo';
import { ContactInfoDto } from '../dto/contactInfo.dto';

export class ContactInfoMapper {
  public static toEntity(contactInfoDto: ContactInfoDto): ContactInfo {
    const contactInfo = new ContactInfo();

    contactInfo.name = contactInfoDto.name;
    contactInfo.lastname = contactInfoDto.lastname;
    contactInfo.email = contactInfoDto.email;
    contactInfo.phone = contactInfoDto.phone;

    return contactInfo;
  }

  public static toOutputDto(contactInfo: ContactInfo): ContactInfoDto {
    const contactInfoDto: ContactInfoDto = {
      id: contactInfo.id,
      name: contactInfo.name,
      lastname: contactInfo.lastname,
      email: contactInfo.email,
      phone: contactInfo.phone,
    };

    return contactInfoDto;
  }
}
