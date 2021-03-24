import { Role } from "../database/entities/Role";
import { RoleDto } from "../dto/role.dto";


export class RoleMapper {
  public static toEntity(roleDto: RoleDto): Role{ 
    const role = new Role();
    
    role.name = roleDto.name;

    return role;
  }

  public static toOutputDto(role: Role): RoleDto {
    
    const roleDto: RoleDto = {
      'id': role.id,
      'name': role.name
    }

    return roleDto;
  }
}