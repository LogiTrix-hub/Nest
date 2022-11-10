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
      // await user.$set('roles', [role.id]);
      // user.roles = [role];
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
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async giveNewRole(email: string, roleId: number) {
    const user = await this.getUserByEmail(email);
    // const prevRoles = user.roles.map((i) => i.id);
    console.log(user);

    // await user.$set('roles', [...prevRoles, roleId]);
  }

  // async removeOneRole(email: string, roleId: number) {
  //   const user = await this.getUserByEmail(email);
  //   const updatedRoles = user.roles.filter((i) => i.id !== roleId);
  //   // await user.$set('roles', updatedRoles);
  // }
}
