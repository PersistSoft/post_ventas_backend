import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Role } from './Role';
import { Project } from './project';
import { Aparment } from './aparments';
import { Warranty } from './warranty';
import { Exclude } from 'class-transformer';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone: number;

  @Column({ nullable: false, default: false })
  dataController: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany((type) => Aparment, { eager: true })
  @JoinTable({
    name: 'client_apartment',
    joinColumn: {
      name: 'id_client',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_aparment',
      referencedColumnName: 'id',
    },
  })
  aparments: Aparment[];
}
