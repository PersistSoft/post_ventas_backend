import { getCustomRepository, getConnection } from 'typeorm';
import { ParkingRepository } from '../repositories/parking.repository';

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
}
