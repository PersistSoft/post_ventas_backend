import { getCustomRepository, getConnection } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection('postventa').getCustomRepository(UserRepository);
  }

  /**
   *
   */
  public findAll = async () => {
    const users = await this.userRepository.find();
    return users;
  };

    /**
   *
   */
  public findByUsername = async (username: string) => {
    const user = await this.userRepository.findByUsername(username);
    return user;
  };
}
