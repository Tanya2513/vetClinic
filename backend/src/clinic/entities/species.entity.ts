import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  constructor(type: string, description: string) {
    this.type = type;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  features: string;
}
