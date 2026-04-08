import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tables')
export class TableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  seats: number;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 'available' })
  status: string;

  @Column({ nullable: true, type: 'integer' })
  currentOrderId: number | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
