import { getConnection } from 'typeorm';

import { AparmentDto } from '../dto/aparment.dto';
import { Aparment } from '../database/entities/aparments';

import { AparmentRepository } from './../repositories/aparments.repository';
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
      aparment.appartmentKey = this.getApprtmetnKey(building.id, aparment.name);
      
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

  public validateAppartment = async (request) => {
    try {

      console.log('Service request: ',request);
      const result = await this.aparmentRepository.findByIdAndkey(request);
      
      return result;

    } catch (error) {
      throw error;
    }
  };

  /**
   * Configurate the appartment key
   * @returns 
   */
  public configureAppartment = async () => {
    try {

      const buildings = await this.buildingService.findAll();
      
      buildings.map( async building => {
        const aparments = await this.aparmentRepository.findByBuildingIdAndKeyNull(building.id);

        aparments.map(async  apprt => {
          apprt.appartmentKey = this.getApprtmetnKey(building.id,apprt.name);
          await this.aparmentRepository.save(apprt);
        });
      })

      return {
        response: 'The task was executed'
      };

    } catch (error) {
      throw error;
    }
  };

  /**
   * Generate apprtment key
   * @param buildingId 
   * @param appartmentName 
   * @returns 
   */
  public getApprtmetnKey(buildingId: number, appartmentName: string): string{
    const key = Math.random().toString(36).substring(2,5);
    appartmentName = appartmentName?.split(' ').join('');
    return `T${buildingId}${appartmentName}${key}`.toUpperCase();
  }
}
