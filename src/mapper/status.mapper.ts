import { AparmentType } from "../database/entities/aparmentType";
import { Status } from "../database/entities/status";
import { StatusDto } from "../dto/status.dto";


export class StatusMapper {
  public static toEntity(statusDto: StatusDto): Status{ 
    const status = new Status();
    
    status.name = statusDto.name;

    return status;
  }

  public static toOutputDto(status: Status): StatusDto {
    
    const statusDto: StatusDto = {
      'id': status.id,
      'name': status.name
    }

    return statusDto;
  }
}