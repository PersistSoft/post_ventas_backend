import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Aparment } from './aparments';

@Entity('parking')
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parking: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Aparment, (aparment) => aparment.storageUnits)
  aparment: Aparment;
}
