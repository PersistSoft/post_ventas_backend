import { EntityRepository, Repository } from "typeorm";
import { PSFile } from "../database/entities/file";
import { Role } from "../database/entities/Role";

@EntityRepository(PSFile)
export class FileRepository extends Repository<PSFile> {
  
  findById(id: number) {
    return this.findOne({ id });
  }
}