import { AparmentDto } from "./aparment.dto";
import { ContactInfoDto } from "./contactInfo.dto";
import { StatusDto } from "./status.dto";
import { WarrantyTypeDto } from "./warrantyType.dto";

export interface WarrantyOutputDto {
  id: number;
  clientSing: number;
  apartmentId: AparmentDto;
  warrantyType: WarrantyTypeDto[];
  status: StatusDto;
  value: number;
  contactInfo: ContactInfoDto;
  closeAt: Date;
}