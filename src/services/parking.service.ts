import { getCustomRepository, getConnection } from 'typeorm';
import { Aparment } from '../database/entities/aparments';
import { ParkingDto } from '../dto/parking.dto';
import { ParkingRepository } from '../repositories/parking.repository';
import { ParkingMapper } from './../mapper/parking.mapper';

export class ParkingService {
  private parkingRepository: ParkingRepository;

  constructor() {
    this.parkingRepository = getConnection('postventa').getCustomRepository(ParkingRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const parkings = await this.parkingRepository.find();
    return parkings;
  };

  /**
   *@param {number}  idParking id
   */
  public findById = async (idParking: number) => {
    const parking = await this.parkingRepository.findById(idParking);
    return parking;
  };

  /**
   * Create new Parking
   */
  public create = async (parkingDto: ParkingDto, aparment: Aparment) => {
    let newParking = ParkingMapper.toEntity(parkingDto, aparment);

    newParking = await this.parkingRepository.save(newParking);

    return ParkingMapper.toOutputDto(newParking);
  };
}
