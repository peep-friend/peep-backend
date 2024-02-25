import BaseTimeEntity from 'src/global/domain/Basetime.entity';
import { UserType } from 'src/global/enum/UserType.enum';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'TB_USER' })
@Unique(['email', 'token'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 120,
    comment: '이메일',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '비밀번호',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 150,
    comment: '소셜토큰',
    nullable: false,
  })
  token: string;

  @Column({
    type: 'enum',
    enum: UserType,
    comment: '로그인 연동 정보',
    nullable: false,
  })
  type: UserType;

  @Column({
    type: 'datetime',
    comment: '마지막 로그인 시간',
    nullable: false,
  })
  lastLoginDate: Date;
}
