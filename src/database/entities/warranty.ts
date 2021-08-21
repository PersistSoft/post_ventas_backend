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
import { ContactInfo } from './contactInfo';
import { Exclude } from 'class-transformer';

@Entity('warranties')
export class Warranty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'close_at', nullable: true })
  closeAt: Date;

  @Column({ nullable: true, default: null })
  explanation: string;
  @Column({ nullable: true, default: false })
  checked: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'client_sign', nullable: true })
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

  @ManyToOne(() => Status)
  @JoinColumn()
  status: Status;

  @Column({ nullable: true })
  value: number;

  @ManyToOne(() => ContactInfo)
  contactInfo: ContactInfo;
}
