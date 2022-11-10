import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Roles {
  @ApiProperty({ example: 1, description: 'Uniq identifier of role' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Uniq role of user' })
  @Column({ unique: true, nullable: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description of role' })
  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'roles',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'nest_user',
      referencedColumnName: 'id',
    },
  })
  roles: User[];
}
