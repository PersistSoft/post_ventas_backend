import { NextFunction, Request, Response, Router } from 'express';
import Boom from '@hapi/boom';
import { validationHandler } from './../utils/middleware/schemaValidation';

import { ClientDto } from '../dto/client.dto';
import { ClientService } from '../services/client.service';
import { clientSchema } from '../utils/schema/client.schema';

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
   * Get all Clients
   */

  public clients = async (req: Request, res: Response) => {
    let clients = await this.clientService.findAll();
    res.send(clients).json;
  };

  /**
   * Crete new Client
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let newClient: ClientDto = req.body;
      // if (!newClient) {
      //   next(Boom.badRequest('Does not found de client information'));
      // }
      newClient = await this.clientService.create(newClient);
      res.status(201).json(newClient);
    } catch (error) {
      next(Boom.badImplementation(error));
    }
  };

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
    this.router.post('/', validationHandler(clientSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
