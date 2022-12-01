import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/roles/entity/roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('nest_user')
export class User {
  @ApiProperty({ example: 1, description: 'Uniq identifier of user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email of user' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'pass1234', description: 'Password of user' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: false, description: 'User ban status' })
  @Column({ nullable: true })
  banned: boolean;

  @ApiProperty({
    example: 'Some reason description',
    description: 'User ban reason',
  })
  @Column({ nullable: true })
  banReason: string;

  @ManyToMany(() => Roles)
  @JoinTable()
  roles: Roles[];
}
