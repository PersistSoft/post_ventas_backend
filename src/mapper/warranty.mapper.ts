import { Entity } from "typeorm";
import { Aparment } from "../database/entities/aparments";
import { ContactInfo } from "../database/entities/contractInfo";
import { Status } from "../database/entities/status";
import { Warranty } from "../database/entities/warranty";
import { WarrantyType } from "../database/entities/warrantyType";
import { AparmentDto } from "../dto/aparment.dto";
import { WarrantyDto } from "../dto/warranty.dto";
import { WarrantyOutputDto } from "../dto/WarrantyOutpuDto";
import { AparmentService } from "../services/aparments.service";
import { ContactInfoService } from "../services/contactInfo.service";
import { StatusService } from "../services/status.service";
import { WarrantyTypeService } from "../services/warrantyType.service";
import { ApartmentMapper } from "./aparment.mapper";
import { ContactInfoMapper } from "./contactInfo.mapper";
import { StatusMapper } from "./status.mapper";
import { WarrantyTypeMapper } from "./warrantyType.mapper";

export class WarrantyMapper {
  
  public static async toEntity(warrantyDto: WarrantyDto) {
    
    const contactInfoService = new ContactInfoService();
    const warrantyTypeService = new WarrantyTypeService();
    const statusService = new StatusService();
    const apartmentService = new AparmentService();

    const warranty = new Warranty();
    
    const contact = await contactInfoService.findById(warrantyDto.contractInfoId);
    
    if(!contact){
      throw `Contact info id:${warrantyDto.contractInfoId} doesn't exist`;
    }
    const contactEntity = new ContactInfo();
    contactEntity.id = contact.id;
    warranty.contactInfo = contactEntity;

    const status = await statusService.findById(warrantyDto.statusId);
    if(!status){
      throw `Status id:${warrantyDto.statusId} doesn't exist`;
    }
    const statusEntity = new Status();
    statusEntity.id = status.id;
    warranty.status = statusEntity;

    const apartment = await apartmentService.findById(warrantyDto.apartmentId);
    
    if(!apartment){
      throw `Status id:${warrantyDto.apartmentId} doesn't exist`;
    }
    const apartmentEntity = new Aparment();
    apartmentEntity.id = apartment.id;
    warranty.aparment = apartmentEntity;

    const types = await warrantyTypeService.findByIds(warrantyDto.warrantyTypeIds);
    if(!types){
      throw `Apartments ids:${warrantyDto.warrantyTypeIds} don't exist`;
    }

    const typeEntities: WarrantyType[] = [];
    types.forEach(type => {
      let warrantyType  = new WarrantyType();
      warrantyType.id = type.id;
      typeEntities.push(warrantyType);
    });

    warranty.warrantyTypes = typeEntities;
    warranty.closeAt = warrantyDto.closeAt;
    warranty.value = warrantyDto.value;
    
    return warranty;
  }

  public static toOutputDto(warranty: Warranty): WarrantyOutputDto {
    
    const warrantyDto: WarrantyOutputDto= {
      id: warranty.id,
      clientSing: warranty.clientSing,
      apartmentId: ApartmentMapper.toOutputDto(warranty.aparment),
      warrantyType: WarrantyTypeMapper.toListOutputDto(warranty.warrantyTypes),
      status: StatusMapper.toOutputDto(warranty.status),
      value: warranty.value,
      contactInfo: ContactInfoMapper.toOutputDto(warranty.contactInfo),
      closeAt: warranty.closeAt
    }
    return warrantyDto;
  }
}