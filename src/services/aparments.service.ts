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
  private apartmentTypeService: AparmentTypeService;
  private buildingService: BuildingService;

  constructor() {
    this.aparmentRepository = getConnection('postventa').getCustomRepository(AparmentRepository);
    this.apartmentTypeService = new AparmentTypeService();
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
   *@param {number}  idBuilding id
   */
  public findByBuildingId = async (idBuilding: number) => {
    let aparment = await this.aparmentRepository.findByBuildingId(idBuilding);

    if (!aparment) {
      throw `Apartment with id: ${idBuilding} doesn't exist`;
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

      const type = await this.apartmentTypeService.findById(aparment.type.id);

      const newAparment = await this.aparmentRepository.save(aparment);
      return classToPlain(newAparment) as Aparment;

    } catch (error) {
      throw error;
    }
  };

  public findByName = async (name: string) => {
    try {
      
      const type = await this.aparmentRepository.findByName(name);
      return type;
      
    } catch (error) {
      throw error;
    }
  };
}
