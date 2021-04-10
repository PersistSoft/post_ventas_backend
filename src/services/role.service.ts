import { getCustomRepository, getConnection } from "typeorm";
import { RoleDto } from "../dto/role.dto";
import { RoleMapper } from "../mapper/role.mapper";
import { RoleRepository } from "../repositories/role.repository";
import { classToPlain } from 'class-transformer';
export class RoleService {
  private roleRepository: RoleRepository;

  constructor(){
    this.roleRepository = getConnection("postventa").getCustomRepository(RoleRepository);
  }

  /**
   * Find all roles
   */
  public findAll = async () => {
    const roles = await this.roleRepository.find();
    return classToPlain(roles);
  }

  public findById = async (id: number) => {
    
    const role = await this.roleRepository.findById(id);
  
    if(!role){
      throw `Role with id: ${id} doesn't exist`
    }

    return classToPlain(role);
  }

  public create = async (role: RoleDto) => {
    try {

      const newRole = await this.roleRepository.save(role);
      return classToPlain(newRole); 

    } catch (error) {
      throw error;
    }
  }
}