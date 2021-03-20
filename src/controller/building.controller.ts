import { Request, Response, Router } from 'express';
import { BuildingService } from '../services/building.service';

export class BuildingController {
  public router: Router;
  public buildingService: BuildingService;

  constructor() {
    this.init();
  }

  private init() {
    this.buildingService = new BuildingService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Buildings
   */

  public buildings = async (req: Request, res: Response) => {
    let buildings = await this.buildingService.findAll();
    res.send(buildings).json;
  };

  /**
   * Crete new Building
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update Building
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Building
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.buildings);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
