import { Request, Response, Router } from 'express';
import { StorageUnitService } from '../services/storage_unit.service';

export class StorageUnitController {
  public router: Router;
  private storageUnitService: StorageUnitService;

  constructor() {
    this.init();
  }

  private init() {
    this.storageUnitService = new StorageUnitService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Storage Units
   */

  public parkings = async (req: Request, res: Response) => {
    let storage_units = await this.storageUnitService.findAll();
    res.send(storage_units).json;
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
