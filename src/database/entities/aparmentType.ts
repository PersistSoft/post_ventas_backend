import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Aparment } from './aparments';

@Entity('aparment_type')
export class AparmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Aparment, (aparment) => aparment.type)
  aparment: Aparment;
}
