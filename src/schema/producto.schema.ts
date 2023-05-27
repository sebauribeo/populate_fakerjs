import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class DProducto extends BaseEntity {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  categoria: string;

  @Column()
  proveedor: string;

  @Column()
  precio: number;

  @Column()
  stockActual: number;

  @Column()
  stockMinimo: number;

  @Column()
  caducidad: string;
}
