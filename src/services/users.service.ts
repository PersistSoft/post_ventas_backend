import { getConnection } from 'typeorm';
import { User } from '../database/entities/user';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { RoleService } from './role.service';
import { Role } from '../database/entities/Role';

export class UserService {
  private userRepository: UserRepository;
  private roleService: RoleService;
  constructor() {
    this.roleService = new RoleService();
    this.userRepository = getConnection('postventa').getCustomRepository(UserRepository);
  }

  /**
   * 
   */
  public findAll = async () => {
    try {
      const users = await this.userRepository.find();
      return users;  
    } catch (error) {
      console.error(error);
    }
  } 

  /**
   * Find user by username
   * @param username 
   */
  public findByUsername = async (username: string) => {
    const user = await this.userRepository.findByUsername(username);
    return user;
  };

  /**
   * Save user
   * @param user 
   */
  public save = async (userDto: UserDto) => {
    const userEntity = new User();
    
    const role = await this.roleService.findById(userDto.rolId) as Role;

    userEntity.username = userDto.username;
    userEntity.lastname = userDto.lastName;
    userEntity.email = userDto.email;
    userEntity.name = userDto.name;
    userEntity.password = bcrypt.hashSync(userDto.password, 10);
    userEntity.role = role;
    
    const user = await this.userRepository.save(userEntity);
    
    return user;
  }
}
