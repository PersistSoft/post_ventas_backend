import { Aparment } from '../database/entities/aparments';

import { Parking } from '../database/entities/parkings';
import { ParkingDto } from '../dto/parking.dto';

export class ParkingMapper {
  public static toEntity(parking: ParkingDto, aparment: Aparment): Parking {
    const newParking = new Parking();

    newParking.name = parking.name;
    newParking.aparment = aparment;

    return newParking;
  }

  public static toOutputDto(parking: Parking): ParkingDto {
    const parkingDto: ParkingDto = {
      id: parking.id,
      name: parking.name,
      aparment_id: parking.aparment.id,
    };

    return parkingDto;
  }
}
