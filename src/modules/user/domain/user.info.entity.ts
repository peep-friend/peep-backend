import BaseTimeEntity from 'src/global/domain/Basetime.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_USERINFO' })
export default class UserInfo extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    comment: '재화',
    nullable: true,
  })
  coin: number;

  @Column({
    type: 'integer',
    comment: '게임 목숨',
    nullable: true,
  })
  heart: number;
}
