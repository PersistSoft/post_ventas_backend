import { Request, Response, Router } from 'express';
import { ClientService } from '../services/client.service';

export class ClientController {
  public router: Router;
  public clientService: ClientService;

  constructor() {
    this.init();
  }

  private init() {
    this.clientService = new ClientService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Buildings
   */

  public clients = async (req: Request, res: Response) => {
    let clients = await this.clientService.findAll();
    res.send(clients).json;
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
    this.router.get('/', this.clients);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
