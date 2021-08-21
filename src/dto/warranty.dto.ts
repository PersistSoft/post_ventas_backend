import { AparmentDto } from './aparment.dto';
import { ContactInfoDto } from './contactInfo.dto';
import { StatusDto } from './status.dto';
import { WarrantyTypeDto } from './warrantyType.dto';

export interface WarrantyDto {
  clientSign: number;
  aparment: AparmentDto;
  warrantyTypes: WarrantyTypeDto[];
  status: StatusDto;
  value: number;
  contactInfo: ContactInfoDto;
  closeAt: Date;
  explanation: string;
}
