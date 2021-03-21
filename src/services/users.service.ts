import { getConnection } from 'typeorm';
import { User } from '../database/entities/user';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection('postventa').getCustomRepository(UserRepository);
  }

  /**
   * Find all users
   */
  public findAll = async () => {
    const users = await this.userRepository.find();
    return users;
  };

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

    userEntity.username = userDto.username;
    userEntity.lastname = userDto.lastName;
    userEntity.email = userDto.email;
    userEntity.name = userDto.name;
    userEntity.password = bcrypt.hashSync(userDto.password, 10);

    const user = await this.userRepository.save(userEntity);
    return user;
  }
}
