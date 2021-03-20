import { EntityRepository, Repository } from 'typeorm';
import { Parking } from '../database/entities/parkings';

@EntityRepository(Parking)
export class ParkingRepository extends Repository<Parking> {}
