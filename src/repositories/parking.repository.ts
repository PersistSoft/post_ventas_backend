import { EntityRepository, Repository } from 'typeorm';
import { Parking } from '../database/entities/parkings';

@EntityRepository(Parking)
export class ParkingRepository extends Repository<Parking> {
  findById(idParking: number) {
    return this.findOne({ id: idParking });
  }
}
