import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from './user';
import { Project } from './project';
import { Aparment } from './aparments';
import { Client } from './client';
import { warrantyType } from './warrantyType';

@Entity('warranties')
export class Warranty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isValid: boolean;

  @Column({ name: 'close_at' })
  closeAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'client_sign' })
  clientSing: number;

  @ManyToOne(() => Client, (client) => client.warranties)
  client: Client;

  @ManyToOne(() => Aparment, (aparment) => aparment.warranties)
  aparment: Aparment;

  @ManyToMany((type) => warrantyType, { eager: true })
  @JoinTable({
    name: 'warranty_warranty_type',
    joinColumn: {
      name: 'id_warranty',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_warranty_type',
      referencedColumnName: 'id',
    },
  })
  aparments: warrantyType[];
}
