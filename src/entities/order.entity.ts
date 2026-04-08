import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { TableEntity } from './table.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json' })
  items: any[];

  @Column({ default: 'Guest' })
  customerName: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => RestaurantEntity, restaurant => restaurant.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: RestaurantEntity;

  @Column()
  restaurantId: number;

  @ManyToOne(() => TableEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tableId' })
  table: TableEntity;

  @Column({ nullable: true })
  tableId: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
