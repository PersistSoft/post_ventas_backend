import { EntityRepository, Repository } from "typeorm";
import { Role } from "../database/entities/Role";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}