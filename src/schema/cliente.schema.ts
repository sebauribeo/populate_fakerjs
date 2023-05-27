import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class DCliente extends BaseEntity {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column()
  genero: string;

  @Column()
  direccion: string;

  @Column()
  fechaRegistro: string;

  @Column()
  ultimaCompra: string;
}
