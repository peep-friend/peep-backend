import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({ name: 'createdDate' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modifiedDate' })
  modifiedDate: Date;
}
