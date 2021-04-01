import { WarrantyType } from "../database/entities/warrantyType";
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

  public static toListOutputDto(warrantyTypes: WarrantyType[]): WarrantyTypeDto[] {
    let warrantyTypesDto: WarrantyTypeDto[] = [];

    warrantyTypes.forEach((warrantyType) => {
      const warrantyTypeDto: WarrantyTypeDto = {
        'id': warrantyType.id,
        'name': warrantyType.name
      }

      warrantyTypesDto.push(warrantyTypeDto);

    });

    return warrantyTypesDto;
  }
}