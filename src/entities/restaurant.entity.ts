import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { OrderEntity } from './order.entity';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  cuisine: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => MenuEntity, menu => menu.restaurant)
  menus: MenuEntity[];

  @OneToMany(() => OrderEntity, order => order.restaurant)
  orders: OrderEntity[];
}
