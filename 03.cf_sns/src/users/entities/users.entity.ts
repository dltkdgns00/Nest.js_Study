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

  @Column({
    // 1)
    length: 20,
    // 2)
    unique: true,
  })
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것
  nickname: string;

  @Column({
    unique: true,
  })
  // 1) 유일무이한 값이 될 것
  email: string;

  @Column()
  password: string;

  @Column()
  role: RolesEnum;
}
