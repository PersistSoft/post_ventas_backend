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
    try {

      let clients = await this.clientService.findAll();
      res.send(clients).json;  

    } catch (error) {
      res.status(500).json(error);
    }
  };

  /**
   * Crete new Client
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let client: ClientDto = req.body;
      let newClient = await this.clientService.create(client);
      res.status(201).json(newClient);
      
    } catch (error) {
      res.status(500).json(error);
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
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
