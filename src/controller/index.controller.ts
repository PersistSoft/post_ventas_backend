import { Router } from 'express';

export class IndexController {
  public router: Router;

  constructor(){
    this.router = Router();
    this.routes();
  }

  public routes(){
    let version = {
      api: 'Post Venta',
      version: '0.0.1'
    }

    this.router.get('/', (req, res) => {
      res.send(version);
    });
  }
}