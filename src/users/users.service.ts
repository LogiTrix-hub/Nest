import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}
  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getRoleByValue('USER');
      user.roles = [role];
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      const [error] = err.errors;
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    const userResults = await this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      // .leftJoinAndSelect('user.roles', 'roles')
      .where('user.email = :id', { id: email })
      .getOne();
    // .select('user.email', email)
    console.log(3333, userResults, user);

    return user;
  }

  async giveNewRole(email: string, roleId: number) {
    const user = await this.getUserByEmail(email);
    const role = await this.rolesService.getRoleById(roleId);
    // user.roles.push(role);
    await this.userRepository.save(user);
    return user;
  }

  async removeOneRole(email: string, roleId: number) {
    const user = await this.getUserByEmail(email);
    // user.roles = user.roles.filter((i) => i.id !== roleId);
    await this.userRepository.save(user);
    return user;
  }
}
