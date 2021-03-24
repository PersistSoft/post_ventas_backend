import { getConnection } from 'typeorm';
import { ApartmentTypeDto } from '../dto/apartmentType.dto';
import { ApartmentTypeMapper } from '../mapper/apartmentType.mapper';

import { AparmentTypeRepository } from './../repositories/aparmentType.repository';

export class AparmentTypeService {
  private aparmentTypeRepository: AparmentTypeRepository;

  constructor() {
    this.aparmentTypeRepository = getConnection('postventa').getCustomRepository(AparmentTypeRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const aparmentsTypes = this.aparmentTypeRepository.find();
    return aparmentsTypes;
  };

  public create = async (apartmentTypeDto: ApartmentTypeDto) => {
    let newApartmentType = ApartmentTypeMapper.toEntity(apartmentTypeDto);
    
    newApartmentType = await this.aparmentTypeRepository.save(newApartmentType);

    return ApartmentTypeMapper.toOutputDto(newApartmentType);
  }
}
