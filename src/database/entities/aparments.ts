import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Building } from './building';
import { Warranty } from './warranty';

@Entity('aparments')
export class Aparment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  deliveryDate: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Building, (building) => building.aparments)
  building: Building;

  @OneToMany(() => Warranty, (warranty) => warranty.aparment)
  warranties: Warranty[];
}
