import { WarrantyType } from "../database/entities/warrantyType";
import { WarrantyTypeDto } from "../dto/warrantyType.dto";


export class WarrantyTypeMapper {
  public static toEntity(warrantyTypeDto: WarrantyTypeDto): WarrantyType{ 
    const warrantyType = new WarrantyType();
    
    warrantyType.name = warrantyTypeDto.name;

    return warrantyType;
  }

  public static toOutputDto(warrantyType: WarrantyType) {

  }

  public static toListOutputDto(warrantyTypes: WarrantyType[]) {

  }
}