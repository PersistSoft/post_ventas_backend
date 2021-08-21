import { classToPlain } from 'class-transformer';
import { getConnection } from 'typeorm';
import { AparmentType } from '../database/entities/aparmentType';
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
    try {
      
      const aparmentsTypes = this.aparmentTypeRepository.find();
      return classToPlain(aparmentsTypes);  

    } catch (error) {
      throw  error;
    }
    
  };

  /**
   *
   */
  public findById = async (idType: number) => {
    try {
    
      const aparmentsType = await this.aparmentTypeRepository.findById(idType);
      return classToPlain(aparmentsType);

    } catch (error) {
      throw error;
    }
  };

  public create = async (apartmentTypeDto: ApartmentTypeDto) => {
    try {

      let aparmentType = await this.aparmentTypeRepository.save(apartmentTypeDto);
      return classToPlain(aparmentType) as AparmentType;

    } catch (error) {
      throw error;
    }
  };

  public findByName = async (name: string) => {
    try {
      
      const type = await this.aparmentTypeRepository.findByName(name);
      return type;
      
    } catch (error) {
      throw error;
    }
  };
}
