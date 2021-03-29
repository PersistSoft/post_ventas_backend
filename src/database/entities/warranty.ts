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
import { WarrantyType } from './warrantyType';
import { Status } from './status';
import { ContactInfo } from './contractInfo';

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

  @ManyToOne(() => Aparment, (aparment) => aparment.warranties)
  aparment: Aparment;

  @ManyToMany((type) => WarrantyType, { eager: true })
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
  warrantyTypes: WarrantyType[];

  @OneToOne(() => Status, (status) => status.warranty)
  @JoinColumn()
  status: Status;

  @Column()
  private value: number;

  @ManyToOne(() => ContactInfo)
  contactInfo: ContactInfo;
}
