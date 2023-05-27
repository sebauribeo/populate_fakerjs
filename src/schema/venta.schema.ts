import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { DCliente } from './cliente.schema';
import { DTienda } from './tienda.schema';
import { DHora } from './hora.schema';
import { DProducto } from './producto.schema';
import { DPromocion } from './promocion.schema';


@Entity()
export class HVenta extends BaseEntity {
  @PrimaryGeneratedColumn()
  idVenta: number;

  @ManyToOne(() => DCliente)
  @JoinColumn({ name: 'idCliente' })
  cliente: DCliente;

  @ManyToOne(() => DTienda)
  @JoinColumn({ name: 'idTienda' })
  tienda: DTienda;

  @ManyToOne(() => DPromocion)
  @JoinColumn({ name: 'idPromocion' })
  promocion: DPromocion;

  @ManyToOne(() => DProducto)
  @JoinColumn({ name: 'idProducto' })
  producto: DProducto;

  @ManyToOne(() => DHora)
  @JoinColumn({ name: 'idHora' })
  hora: DHora;

  @Column()
  fecha: string;

  @Column()
  horaVenta: string;

  @Column()
  totalVenta: number;

  @Column()
  precioUnitario: number;

  @Column()
  cantidad: number;
}
