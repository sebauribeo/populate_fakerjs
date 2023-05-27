import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class DPromocion extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPromocion: number;

  @Column()
  tipo: string;

  @Column()
  fechaInicio: string;

  @Column()
  fechaTermino: string;

  @Column()
  costo: number;
}
