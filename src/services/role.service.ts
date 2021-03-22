import { getCustomRepository, getConnection } from "typeorm";
import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
  private roleRepository: RoleRepository;

  constructor(){
    this.roleRepository = getConnection("postventa").getCustomRepository(RoleRepository);
  }

  /**
   * Find all roles
   */
  public findAll = async () => {
    const blueprints = await this.roleRepository.find();
    return blueprints;
  }

  public findById = async (id: number) => {
    const role = await this.roleRepository.findById(id);
    return role;
  }
}