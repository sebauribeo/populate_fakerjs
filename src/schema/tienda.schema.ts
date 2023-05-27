import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class DTienda extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTienda: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  region: string;

  @Column()
  codigoPostal: string;
}
