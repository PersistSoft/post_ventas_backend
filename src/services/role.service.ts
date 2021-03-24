import { getCustomRepository, getConnection } from "typeorm";
import { RoleDto } from "../dto/role.dto";
import { RoleMapper } from "../mapper/role.mapper";
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

  public create = async (role: RoleDto) => {
    let newRole = RoleMapper.toEntity(role);
    
    newRole = await this.roleRepository.save(newRole);

    return RoleMapper.toOutputDto(newRole);
  }
}