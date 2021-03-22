import { EntityRepository, Repository } from "typeorm";
import { Role } from "../database/entities/Role";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  
  findById(id: number) {
    const role = new Role();
    role.id = id;

    return this.findOne(role);
  }
}