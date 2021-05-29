import { classToPlain } from 'class-transformer';
import { getCustomRepository, getConnection } from 'typeorm';
import { Aparment } from '../database/entities/aparments';
import { Parking } from '../database/entities/parkings';
import { ParkingDto } from '../dto/parking.dto';
import { AparmentRepository } from '../repositories/aparments.repository';
import { ParkingRepository } from '../repositories/parking.repository';
import { ParkingMapper } from './../mapper/parking.mapper';
import { AparmentService } from './aparments.service';

export class ParkingService {
  private parkingRepository: ParkingRepository;
  private aparmentService: AparmentService;

  constructor() {
    this.parkingRepository = getConnection('postventa').getCustomRepository(ParkingRepository);
    this.aparmentService = new AparmentService();
  }

  /**
   *
   */
  public findAll = async () => {
    try {

      const parkings = await this.parkingRepository.find();
      return parkings; 

    } catch (error) {
      throw error;
    }
  };

  /**
   *@param {number}  idParking id
   */
  public findById = async (idParking: number) => {
    try {

      const parking = await this.parkingRepository.findById(idParking);

      if(!parking){
        throw `Parking with id: ${idParking} doesn't exist.`
      }

      return parking;  

    } catch (error) {
      throw error;
    }
    
  };

  /**
   * Create new Parking
   */
  public create = async (parkingDto: ParkingDto) => {
    try {

      await this.aparmentService.findById(parkingDto.aparment.id);
      const newParking = await this.parkingRepository.save(parkingDto);
      return classToPlain(newParking) as Parking;

    } catch (error) {
      throw error;
    }
  };

  public findByName = async (name: string) => {
    try {
      
      const parking = await this.parkingRepository.findByName(name);
      return parking;
      
    } catch (error) {
      throw error;
    }
  };
}
