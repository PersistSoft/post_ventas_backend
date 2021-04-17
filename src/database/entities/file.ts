import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class PSFile {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  mimetype: string;
  
  @Exclude()
  @Column({ type: 'bytea', nullable: true})
  byte: Buffer;
}