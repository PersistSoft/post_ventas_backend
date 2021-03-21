import { EntityRepository, Repository } from 'typeorm';
import { User } from '../database/entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  findByUsername(username: string) {
    const user = new User();
    user.username = username;

    return this.findOne(user);
  }
}
