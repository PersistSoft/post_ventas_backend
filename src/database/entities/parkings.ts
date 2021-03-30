import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';
import { Aparment } from './aparments';

@Entity('parking')
@Unique(['name'])
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @ManyToOne(() => Aparment, (aparment) => aparment.storageUnits)
  aparment: Aparment;
}
