import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Building } from './building';
import { Warranty } from './warranty';
import { Parking } from './parkings';
import { StorageUnit } from './storage_unit';
import { AparmentType } from './aparmentType';
import { Exclude } from 'class-transformer';

@Entity('aparments')
// @Unique(['name'])
export class Aparment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  deliveryDate!: Date;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Building, (building) => building.aparments, { nullable: true })
  building: Building;

  @OneToMany(() => Warranty, (warranty) => warranty.aparment, { nullable: true })
  warranties: Warranty[];

  @OneToMany(() => Parking, (parking) => parking.aparment, { nullable: true })
  parking: Parking[];

  @OneToMany(() => StorageUnit, (storageUnit) => storageUnit.aparment, { nullable: true })
  storageUnits: StorageUnit[];

  @ManyToOne(() => AparmentType, { nullable: true })
  @JoinColumn()
  type: AparmentType;
}
