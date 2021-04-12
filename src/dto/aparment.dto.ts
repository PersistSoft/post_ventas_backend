import { ApartmentTypeDto } from "./apartmentType.dto";
import { BuildingDto } from "./building.dto";

export interface AparmentDto {
  id: number;
  name: string;
  deliveryDate?: Date;
  building: BuildingDto;
  type: ApartmentTypeDto;
}
