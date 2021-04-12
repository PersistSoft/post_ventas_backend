import { Aparment } from '../database/entities/aparments';
import { AparmentType } from '../database/entities/aparmentType';
import { Building } from '../database/entities/building';
import { AparmentDto } from '../dto/aparment.dto';

export class ApartmentMapper {
  public static toEntity(apartmentDto: AparmentDto, building: Building, type: AparmentType): Aparment {
    const aparment = new Aparment();

    aparment.name = apartmentDto.name;
    aparment.deliveryDate = apartmentDto.deliveryDate || new Date();
    aparment.building = building;
    aparment.type = type;

    return aparment;
  }


  public static toSingleEntity(apartmentDto: AparmentDto) {
   
  }

  public static toOutputDto(apartment: Aparment) {

  }
}
