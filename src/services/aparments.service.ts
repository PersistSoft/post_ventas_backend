import { getConnection } from 'typeorm';

import { AparmentDto } from '../dto/aparment.dto';
import { Aparment } from '../database/entities/aparments';
import { Building } from '../database/entities/building';
import { AparmentType } from '../database/entities/aparmentType';

import { AparmentRepository } from './../repositories/aparments.repository';
import { ApartmentMapper } from '../mapper/aparment.mapper';
import { classToPlain } from 'class-transformer';
import { AparmentTypeService } from './aparmentType.service';
import { BuildingService } from './building.service';

export class AparmentService {
  private aparmentRepository: AparmentRepository;
  private apartmentType: AparmentTypeService;
  private buildingService: BuildingService;

  constructor() {
    this.aparmentRepository = getConnection('postventa').getCustomRepository(AparmentRepository);
    this.apartmentType = new AparmentTypeService();
    this.buildingService = new BuildingService();
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
    let aparment = (await this.aparmentRepository.findById(idAparment)) as Aparment;

    if (!aparment) {
      throw `Apartment with id: ${idAparment} doesn't exist`;
    }

    return classToPlain(aparment);
  };

  /**
   * Create a new Aparment
   * @param {Building}  building entity
   * @param {AparmentDto} AparmentDto building Dto
   * @param {AparmentType} ApartmentType  entity
   */

  public create = async (aparment: AparmentDto) => {
    try {
      const building = await this.buildingService.findById(aparment.building.id);

      const type = await this.apartmentType.findById(aparment.type.id);

      const newAparment = await this.aparmentRepository.save(aparment);
      return classToPlain(newAparment);
    } catch (error) {
      throw error;
    }
  };
}
