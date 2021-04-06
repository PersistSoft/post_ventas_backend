import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Building } from './building';
import { Warranty } from './warranty';
import { Parking } from './parkings';
import { StorageUnit } from './storage_unit';
import { AparmentType } from './aparmentType';
import { Exclude } from 'class-transformer';

@Entity('aparments')
export class Aparment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  deliveryDate: Date;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Building, (building) => building.aparments)
  building: Building;

  @OneToMany(() => Warranty, (warranty) => warranty.aparment)
  warranties: Warranty[];

  @OneToMany(() => Parking, (parking) => parking.aparment)
  parking: Parking[];

  @OneToMany(() => StorageUnit, (storageUnit) => storageUnit.aparment)
  storageUnits: StorageUnit[];

  @OneToOne(() => AparmentType, (aparmentType) => aparmentType.type)
  @JoinColumn()
  type: AparmentType;
}
