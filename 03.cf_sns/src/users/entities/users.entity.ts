import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * id: number;
 *
 * nickname: string;
 *
 * email: string;
 *
 * password: string;
 *
 * role: [RolesEnum.USER, RolesEnum.ADMIN]
 */

enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: RolesEnum;
}
