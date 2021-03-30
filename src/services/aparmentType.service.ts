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

  /**
   *
   */
  public findById = async (idType: number) => {
    console.log('aparmentTypeService');
    const aparmentsType = this.aparmentTypeRepository.findById(idType);
    return aparmentsType;
  };

  public create = async (apartmentTypeDto: ApartmentTypeDto) => {
    console.log('hey');
    let newApartmentType = ApartmentTypeMapper.toEntity(apartmentTypeDto);
    console.log('n', newApartmentType);
    newApartmentType = await this.aparmentTypeRepository.save(newApartmentType);

    return ApartmentTypeMapper.toOutputDto(newApartmentType);
  };
}
