import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
const swaggerUi = require('swagger-ui-express');
import * as swaggerDocument from './swagger.json';

import { IndexController } from './controller/index.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './controller/user.controller';
import { ProjectController } from './controller/project.controller';
import { BuildingController } from './controller/building.controller';
import { AparmentsController } from './controller/aparments.controller';
import { AparmentTypeController } from './controller/aparmentType.controller';
import { ParkingController } from './controller/parking.controller';
import { StorageUnitController } from './controller/storage_unit.controller';
import { ClientController } from './controller/clients.controller';
import { WarrantyController } from './controller/warranty.controller';
import { WarrantyTypeController } from './controller/warratyType.controller';
import { StatusController } from './controller/status.controller';
import { AuthController } from './controller/auth.controller';
import { Configuration } from './config';
import { createConnection } from 'typeorm';
import { ContactInfoController } from './controller/contactInfo.controller';
import { FileController } from './controller/file.controller';

import dotenv from 'dotenv';

import compression from 'compression';
import cors from 'cors';

dotenv.config();

class Server {
  private roleController: RoleController;
  private indexController: IndexController;
  private userController: UserController;
  private projectController: ProjectController;
  private buildingController: BuildingController;
  private aparmentsController: AparmentsController;
  private parkingController: ParkingController;
  private storageUnitController: StorageUnitController;
  private clientController: ClientController;
  private warrantyController: WarrantyController;
  private warrantyTypeController: WarrantyTypeController;
  private statusController: StatusController;
  private aparmentTypeController: AparmentTypeController;
  private authController: AuthController;
  private contactInfoController: ContactInfoController;
  private fileController: FileController;
  private apiPrefix = 'api';

  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    const configuration = new Configuration();
    await createConnection(configuration.databaseConfiguration());

    this.indexController = new IndexController();
    this.roleController = new RoleController();
    this.userController = new UserController();
    this.projectController = new ProjectController();
    this.buildingController = new BuildingController();
    this.aparmentsController = new AparmentsController();
    this.aparmentTypeController = new AparmentTypeController();
    this.parkingController = new ParkingController();
    this.storageUnitController = new StorageUnitController();
    this.clientController = new ClientController();
    this.warrantyController = new WarrantyController();
    this.warrantyTypeController = new WarrantyTypeController();
    this.statusController = new StatusController();
    this.authController = new AuthController();
    this.contactInfoController = new ContactInfoController();
    this.fileController = new FileController();

    this.app.use(this.indexController.router);
    this.app.use(`/${this.apiPrefix}/roles`, this.roleController.router);
    this.app.use(`/${this.apiPrefix}/users`, this.userController.router);
    this.app.use(`/${this.apiPrefix}/projects`, this.projectController.router);
    this.app.use(`/${this.apiPrefix}/buildings`, this.buildingController.router);
    this.app.use(`/${this.apiPrefix}/apartments`, this.aparmentsController.router);
    this.app.use(`/${this.apiPrefix}/apartmentTypes`, this.aparmentTypeController.router);
    this.app.use(`/${this.apiPrefix}/parking`, this.parkingController.router);
    this.app.use(`/${this.apiPrefix}/storage`, this.storageUnitController.router);
    this.app.use(`/${this.apiPrefix}/clients`, this.clientController.router);
    this.app.use(`/${this.apiPrefix}/warranties`, this.warrantyController.router);
    this.app.use(`/${this.apiPrefix}/warrantyTypes`, this.warrantyTypeController.router);
    this.app.use(`/${this.apiPrefix}/status`, this.statusController.router);
    this.app.use(`/${this.apiPrefix}/contacts`, this.contactInfoController.router);
    this.app.use(`/${this.apiPrefix}/files`, this.fileController.router);

    this.app.use(`/${this.apiPrefix}/auth`, this.authController.router);
    this.app.use(`/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  }

  /**
   * Used to start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server();
server.start();
