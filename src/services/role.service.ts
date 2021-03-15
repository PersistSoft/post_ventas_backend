import { getCustomRepository, getConnection } from "typeorm";
import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
  private roleRepository: RoleRepository;

  constructor(){
    this.roleRepository = getConnection("postventa").getCustomRepository(RoleRepository);
  }

  /**
   * 
   */
  public findAll = async () => {
    const blueprints = await this.roleRepository.find();
    return blueprints;
  } 
}