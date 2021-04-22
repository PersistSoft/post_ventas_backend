import { getConnection } from "typeorm";
import { classToPlain } from 'class-transformer';
import { FileRepository } from "../repositories/file.repository";
import fs from 'fs';
import { PSFile } from "../database/entities/file";

export class FileService {
  private fileRepository: FileRepository;

  constructor(){
    this.fileRepository = getConnection("postventa").getCustomRepository(FileRepository);
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
}