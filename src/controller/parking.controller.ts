import { Request, Response, Router } from 'express';
import { ParkingService } from '../services/parking.service';

export class ParkingController {
  public router: Router;
  private parkingService: ParkingService;

  constructor() {
    this.init();
  }

  private init() {
    this.parkingService = new ParkingService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Parkings
   */

  public parkings = async (req: Request, res: Response) => {
    let roles = await this.parkingService.findAll();
    res.send(roles).json;
  };

  /**
   * Crete new Parkings
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update Role
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Parkings
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.parkings);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
