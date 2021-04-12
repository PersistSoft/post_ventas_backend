import { Aparment } from '../database/entities/aparments';

import { Parking } from '../database/entities/parkings';
import { ParkingDto } from '../dto/parking.dto';

export class ParkingMapper {
  public static toEntity(parking: ParkingDto, aparment: Aparment) {
    
  }

  public static toOutputDto(parking: Parking) {

  }
}
