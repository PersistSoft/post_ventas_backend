import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { User } from './user';
import { Project } from './project';
import { Aparment } from './aparments';
import { Exclude } from 'class-transformer';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floors: number;

  @Column({ name: 'aparments_number' })
  aparmentsNumber: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.buildings)
  project: Project;

  @OneToMany(() => Aparment, (aparment) => aparment.building)
  aparments: Aparment[];
}
