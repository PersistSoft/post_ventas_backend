import { getConnection } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import { RoleService } from './role.service';
import { Role } from '../database/entities/Role';
import { User } from '../database/entities/user';
import { classToPlain } from 'class-transformer';

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
      return classToPlain(users);  
      
    } catch (error) {
      throw error;
    }
  } 

  /**
   * Find user by username
   * @param username 
   */
  public findByUsername = async (username: string) => {
    try {

      const user = await this.userRepository.findByUsername(username);

      if(!user){
        throw `User with username: ${username} doesn't exist.`;
      }
      return user;      

    } catch (error) {
      throw error;
    }
  };

  /**
   * Save user
   * @param user 
   */
  public save = async (userDto: UserDto) => {
    try {
      
      const role = await this.roleService.findById(userDto.role.id) as Role;
      userDto.password = bcrypt.hashSync(userDto.password, 10);
      let user = await this.userRepository.save(userDto);
      
      return classToPlain(user);

    } catch (error) {
      throw  error;
    }
    
  }
}
