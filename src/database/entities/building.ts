import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from './user';
import { Project } from './project';
import { Aparment } from './aparments';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floors: number;

  @Column({ name: 'aparments_number' })
  aparmentsNumer: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.buildings)
  project: Project;

  @OneToMany(() => Aparment, (aparment) => aparment.building)
  aparments: Aparment[];
}
