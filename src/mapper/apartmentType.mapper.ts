import { AparmentType } from "../database/entities/aparmentType";
import { Role } from "../database/entities/Role";
import { ApartmentTypeDto } from "../dto/apartmentType.dto";

export class ApartmentTypeMapper {
  public static toEntity(apartmentTypeDto: ApartmentTypeDto): AparmentType{ 
    const aparmentType = new AparmentType();
    
    aparmentType.type = apartmentTypeDto.name;

    return aparmentType;
  }

  public static toOutputDto(apartmentType: AparmentType): ApartmentTypeDto {
    
    const apartmentTypeDto: ApartmentTypeDto = {
      'id': apartmentType.id,
      'name': apartmentType.type
    }

    return apartmentTypeDto;
  }
}