import { Role } from "../database/entities/Role";
import { WarrantyType } from "../database/entities/warrantyType";
import { RoleDto } from "../dto/role.dto";
import { WarrantyTypeDto } from "../dto/warrantyType.dto";


export class WarrantyTypeMapper {
  public static toEntity(warrantyTypeDto: WarrantyTypeDto): WarrantyType{ 
    const warrantyType = new WarrantyType();
    
    warrantyType.name = warrantyTypeDto.name;

    return warrantyType;
  }

  public static toOutputDto(warrantyType: WarrantyType): WarrantyTypeDto {
    
    const warrantyTypeDto: WarrantyTypeDto = {
      'id': warrantyType.id,
      'name': warrantyType.name
    }

    return warrantyTypeDto;
  }
}