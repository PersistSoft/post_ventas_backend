import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
  JoinColumn,
} from 'typeorm';

import { Role } from './Role';
import { Project } from './project';

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'id' }])
  role: Role

  @ManyToMany((type) => Project, { eager: true })
  @JoinTable({
    name: 'project_user',
    joinColumn: {
      name: 'id_user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_project',
      referencedColumnName: 'id',
    },
  })
  projects: Project[];
}
