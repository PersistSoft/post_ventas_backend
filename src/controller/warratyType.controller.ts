import { Request, Response, Router } from 'express';
import { WarrantyTypeService } from './../services/warrantyType.service';

export class WarrantyTypeController {
  private warrantyTypeService: WarrantyTypeService;
  public router: Router;

  constructor() {
    this.init();
  }

  init() {
    this.warrantyTypeService = new WarrantyTypeService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all WarrantiesTypes
   */

  public warrantiesTypes = async (req: Request, res: Response) => {
    let warrantiesTypes = await this.warrantyTypeService.findAll();
    res.send(warrantiesTypes).json;
  };

  /**
   * Crete new Users
   */
  public create(req: Request, res: Response) {
    res.send('create');
  }

  /**
   * Update Users
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Users
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.warrantiesTypes);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
