import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './entity/roles.entity';
import { UserRoles } from './user-roles.model';
import { User } from 'src/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Roles, User])],
  exports: [RolesService],
})
export class RolesModule {}
