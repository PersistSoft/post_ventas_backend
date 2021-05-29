import { getConnection } from "typeorm";
import { classToPlain } from 'class-transformer';
import { FileRepository } from "../repositories/file.repository";
import fs from 'fs';
import { PSFile } from "../database/entities/file";
import readXlsxFile from 'read-excel-file/node';
import { LoadingMassiveDto } from "../dto/loadingMassive.dto";
import { readFileSync } from "node:fs";
import { ProjectService } from "./projects.service";
import { Project } from "../database/entities/project";
import { BuildingService } from "./building.service";
import { AparmentService } from "./aparments.service";
import { AparmentTypeService } from "./aparmentType.service";
import { StorageUnitService } from "./storage_unit.service";
import { ProjectSchema } from "../utils/schema/project.schema";
import { Building } from "../database/entities/building";
import { Aparment } from "../database/entities/aparments";
import { AparmentType } from "../database/entities/aparmentType";
import { StorageUnit } from "../database/entities/storage_unit";
import { ParkingService } from "./parking.service";
import { Parking } from "../database/entities/parkings";
import { LoadMassiveErrorDto } from "../dto/loadMassinveErrorDto";

export class FileService {
  private fileRepository: FileRepository;
  private projectService: ProjectService;
  private buildingService: BuildingService;
  private apartmentService: AparmentService;
  private apartmentTypeService: AparmentTypeService;
  private storageUnitService: StorageUnitService;
  private parkingService: ParkingService;

  constructor(){
    this.fileRepository = getConnection("postventa").getCustomRepository(FileRepository);
    this.projectService = new ProjectService();
    this.buildingService = new BuildingService();
    this.apartmentService = new AparmentService();
    this.apartmentTypeService = new AparmentTypeService();
    this.storageUnitService = new StorageUnitService();
    this.parkingService=  new ParkingService();
  }

  /**
   * Find all roles
   */
  public findAll = async () => {
    const roles = await this.fileRepository.find();
    return classToPlain(roles);
  }

  public findById = async (id: number) => {
    
    const file = await this.fileRepository.findById(id);
  
    if(!file){
      throw `File with id: ${id} doesn't exist`
    }

    return file;
  }

  public create = async (file: File) => {
    try {

      if(!file){
        throw 'You need to upload a file';
      }
 
      const data = fs.readFileSync(file['path']);

      let newFile =  new PSFile();
      newFile.mimetype = file['mimetype'];
      newFile.name = file['originalname'];
      newFile.byte = Buffer.from(data);

      fs.unlinkSync(file['path']);

      newFile = await this.fileRepository.save(newFile);

      return classToPlain(newFile); 

    } catch (error) {
      throw error;
    }
  }

  public createSignature = async (signatureBase64: string) => {
    try {

      if(!signatureBase64){
        throw 'You need a signature';
      }
      
      console.log(signatureBase64);
      
      var signature = Buffer.from(signatureBase64, 'base64');

      let newFile =  new PSFile();
      newFile.mimetype = 'image/png';
      newFile.name = 'signature.pgn';
      newFile.byte = Buffer.from(signature);

      newFile = await this.fileRepository.save(newFile);

      return classToPlain(newFile); 

    } catch (error) {
      throw error;
    }
  }

  public massiveLoading = async (file: File) => {
    let allDate: LoadingMassiveDto[] = [];
    const errors: LoadMassiveErrorDto[] = [];

    try {

      if(!file){
        throw 'You need to upload a file';
      }
      
      /**
       * Read file
       */
      await readXlsxFile(file['path']).then( async (rows) => {
        for (let index = 0; index < rows.length; index++) {
          if(index !== 0){
            const data = rows[index];
            let project;
            let building;
            let apartmentType;
            let apartment;

            try {
              project = await this.projectService.findByName(data[0]);
              if(project === undefined){
                const newProject = new Project();
                newProject.name = data[0];
                newProject.address = data[1];
  
                project = await this.projectService.create(newProject); 
              }
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Project';
              errorDto.error = error.message;
              errors.push(errorDto);

              
            }


            try {
              building = await this.buildingService.findByName(data[2]);
            
              if(building === undefined){
                const newBuilding = new Building();
                newBuilding.name = data[2];
                newBuilding.project = project;
                newBuilding.floors = data[3];
                newBuilding.aparmentsNumber = data[4];
  
                building = await this.buildingService.create(newBuilding);
              }
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Building';
              errorDto.error = error.message;
              errors.push(errorDto);
               
            }

            
            try {
              apartmentType = await this.apartmentTypeService.findByName(data[7]);

              if(apartmentType === undefined){
                const newApartmentType = new AparmentType();
                newApartmentType.type = data[7];
  
                apartmentType = await this.apartmentTypeService.create(newApartmentType);
              }  
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Apartment Type';
              errorDto.error = error.message;
              errors.push(errorDto);
            }
            
            
            
            try {
              apartment = await this.apartmentService.findByName(data[5]);

              if(apartment === undefined){
                const newApartment = new Aparment();
                newApartment.name = data[5];
                newApartment.deliveryDate = data[6];
                newApartment.type = apartmentType;
                newApartment.building = building;
  
                apartment = await this.apartmentService.create(newApartment);
              }
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Apartment';
              errorDto.error = error.message;
              errors.push(errorDto);
            }
            
            try {
              let storageUnit = await this.storageUnitService.findByName(data[8]);

            
              if(storageUnit === undefined){
                const newStorageUnit = new StorageUnit();
                newStorageUnit.name = data[8];
                newStorageUnit.aparment = apartment;
  
                storageUnit = await this.storageUnitService.create(newStorageUnit);
              }
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Storage Unit';
              errorDto.error = error.message;
              errors.push(errorDto);
              
            }
            
            try {
              let parking = await this.parkingService.findByName(data[9]);

              if(parking === undefined){
                const newParking = new Parking();
                newParking.name = data[9];
                newParking.aparment = apartment;
  
                parking = await this.parkingService.create(newParking);
              }
            } catch (error) {
              const errorDto = new LoadMassiveErrorDto();
              errorDto.row = index;
              errorDto.column = 'Parking';
              errorDto.error = error.message;
              errors.push(errorDto);
            }
            
          }
        }
      });

      console.log(errors);
      
      fs.unlinkSync(file['path']);
      //return classToPlain(newFile);
    } catch (error) {
      throw error;
    }
  }
}