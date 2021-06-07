import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  midName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
