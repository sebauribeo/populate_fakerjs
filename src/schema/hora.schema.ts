import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class DHora extends BaseEntity {
  @PrimaryGeneratedColumn()
  idHora: number;

  @Column()
  fecha: string;

  @Column()
  dia: string;

  @Column()
  semana: number;

  @Column()
  diaFeriado: string;
}
