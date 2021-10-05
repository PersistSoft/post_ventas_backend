import { Request, Response, Router } from 'express';
import { NotifierDto } from '../dto/notifier.dto';
import { NotifierService } from "../services/notifier.service";

export class NotifierController {
    public router: Router;
    public notifierService: NotifierService;
  
    constructor() {
      this.init();
    }
  
    private init() {
      this.notifierService = new NotifierService();
      this.router = Router();
      this.routes();
    }
  
    /**
     * Get all Users
     */
  
    public sendNotification = async (req: Request, res: Response) => {
      try {
  
        let notifierDto: NotifierDto = req.body;
        this.notifierService.sendEmail(notifierDto)
        res.send({ message: 'Email was send correctly'});
      
      } catch (error) {
        res.status(500).json(error);
      }
    };
  
    public routes() {
      this.router.post('', this.sendNotification);
    }
  }