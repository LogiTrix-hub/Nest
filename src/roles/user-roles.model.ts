import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entity/users.entity';
import { Roles } from './entity/roles.entity';

@Table({
  tableName: 'user_roles',
  createdAt: false,
  updatedAt: false,
})
export class UserRoles extends Model<UserRoles> {
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  //   autoIncrement: true,
  //   primaryKey: true,
  // })
  // id: number;
  // @ForeignKey(() => Roles)
  // @Column({ type: DataType.INTEGER })
  // roleId: number;
  // @ForeignKey(() => User)
  // @Column({ type: DataType.INTEGER })
  // userId: number;
}
