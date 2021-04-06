import Boom from '@hapi/boom';
import { NextFunction, Request, Response, Router } from 'express';
import { ContactInfoDto } from '../dto/contactInfo.dto';
import { ContactInfoService } from '../services/contactInfo.service';
import { validationHandler} from './../utils/middleware/schemaValidation';
import { ContactInfoSchema } from './../utils/schema/contactInfo.schema';

export class ContactInfoController {
  public router: Router;
  private contactInfoService: ContactInfoService;

  constructor() {
    this.init();
  }

  private init() {
    this.contactInfoService = new ContactInfoService();
    this.router = Router();
    this.routes();
  }

  /**
   * Get all Status
   */

  public index = async (req: Request, res: Response) => {
    let contacts = await this.contactInfoService.findAll();
    res.status(200).json(contacts);
  };

  /**
   * Crete new Status
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let contact = req.body as ContactInfoDto;
      contact = await this.contactInfoService.create(contact);
      res.status(201).json(contact);

    } catch (error) {
      next(Boom.badImplementation(error))
    }
  }

  /**
   * Update Status
   */
  public update(req: Request, res: Response) {
    res.send('update');
  }

  /**
   * Delete Status
   */
  public delete(req: Request, res: Response) {
    res.send('delete');
  }

  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', validationHandler(ContactInfoSchema), this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
