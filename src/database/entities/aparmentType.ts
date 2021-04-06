import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Unique } from 'typeorm';
import { Aparment } from './aparments';

@Entity('aparment_type')
@Unique(['type'])
export class AparmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Aparment, (aparment) => aparment.type)
  aparment: Aparment;
}
