import { getConnection } from 'typeorm';

import { AparmentDto } from '../dto/aparment.dto';
import { Aparment } from '../database/entities/aparments';
import { Building } from '../database/entities/building';
import { AparmentType } from '../database/entities/aparmentType';

import { AparmentRepository } from './../repositories/aparments.repository';
import { ApartmentMapper } from '../mapper/aparment.mapper';

export class AparmentService {
  private aparmentRepository: AparmentRepository;

  constructor() {
    this.aparmentRepository = getConnection('postventa').getCustomRepository(AparmentRepository);
  }

  /**
   * Find all
   */
  public findAll = async () => {
    const aparments = await this.aparmentRepository.find();
    return aparments;
  };

  /**
   *@param {number}  idAparment id
   */
  public findById = async (idAparment: number) => {
    let aparment = await this.aparmentRepository.findById(idAparment) as Aparment;
    
    if(!aparment){
      throw `Apartment with id: ${idAparment} doesn't exist`;
    }
    
    return ApartmentMapper.toOutputDto(aparment);
  };

  /**
   * Create a new Aparment
   * @param {Building}  building entity
   * @param {AparmentDto} AparmentDto building Dto
   * @param {AparmentType} ApartmentType  entity
   */

  public create = async (aparment: AparmentDto, building: Building, type: AparmentType) => {
    let newAparment: Aparment = ApartmentMapper.toEntity(aparment, building, type);
    console.log(newAparment);
    newAparment = await this.aparmentRepository.save(newAparment);

    return ApartmentMapper.toOutputDto(newAparment);
  };
}
