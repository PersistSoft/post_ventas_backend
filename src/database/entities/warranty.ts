import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { Aparment } from './aparments';
import { Client } from './client';
import { warrantyType } from './warrantyType';
import { Status } from './status';

@Entity('warranties')
export class Warranty {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => Status, (status) => status.warranty)
  @JoinColumn()
  status: Status;
}
