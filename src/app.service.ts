import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DCliente } from './schema/cliente.schema';
import { DHora } from './schema/hora.schema';
import { DProducto } from './schema/producto.schema';
import { DPromocion } from './schema/promocion.schema';
import { DTienda } from './schema/tienda.schema';
import { HVenta } from './schema/venta.schema';


@Injectable()
export class FakeDataService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(DProducto)
    private readonly dProductoRepository: Repository<DProducto>,
    @InjectRepository(DHora)
    private readonly dHoraRepository: Repository<DHora>,
    @InjectRepository(DCliente)
    private readonly dClienteRepository: Repository<DCliente>,
    @InjectRepository(DTienda)
    private readonly dTiendaRepository: Repository<DTienda>,
    @InjectRepository(DPromocion)
    private readonly dPromocionRepository: Repository<DPromocion>,
    @InjectRepository(HVenta)
    private readonly hVentaRepository: Repository<HVenta>,
  ) {}

  async generateFakeData(): Promise<any> {
    const fakeDataCount = 500;

    const productos: any = Array.from({ length: fakeDataCount }, () => ({
      nombre: faker.commerce.productName(),
      marca: faker.company.name(),
      categoria: faker.commerce.department(),
      proveedor: faker.company.name(),
      precio: faker.number.bigInt({min: 3500, max: 1000000}),
      stockActual: faker.number.bigInt({min: 10, max: 100}),
      stockMinimo: faker.number.bigInt({min: 1, max: 5}),
      caducidad: faker.date.future(),
    }));
    
    await this.dProductoRepository.save(productos);
    
    const horas: any = Array.from({ length: fakeDataCount }, () => ({
      fecha: faker.date.recent(),
      dia: faker.date.weekday(),
      semana: faker.number.bigInt({min: 1, max: 5}),
      diaFeriado: faker.helpers.arrayElement(['Si', 'No']),
    }));

    await this.dHoraRepository.save(horas);

    const clientes: any = Array.from({ length: fakeDataCount }, () => ({
      nombre: faker.person.firstName(),
      edad: faker.number.bigInt({min: 18, max: 65}),
      genero: faker.person.sex(),
      direccion: faker.location.streetAddress(),
      fechaRegistro: faker.date.past(),
      ultimaCompra: faker.date.soon(),
    }));

    await this.dClienteRepository.save(clientes);

    const tiendas: any = Array.from({ length: fakeDataCount }, () => ({
      nombre: faker.company.name(),
      direccion: faker.location.streetAddress(),
      ciudad: faker.location.city(),
      region: faker.location.state(),
      codigoPostal: faker.location.zipCode(),
    }));

    await this.dTiendaRepository.save(tiendas);

    const promociones: any = Array.from({ length: fakeDataCount }, () => ({
      tipo: faker.helpers.arrayElement(['Descuento', 'Oferta', 'Regalo']),
      fechaInicio: faker.date.past(),
      fechaTermino: faker.date.future(),
      costo: faker.number.bigInt({min: 1500, max: 65000}),
    }));    

    await this.dPromocionRepository.save(promociones);

    const ventas: any = Array.from({ length: fakeDataCount }, () => ({
      fecha: faker.date.anytime(),
      horaVenta: faker.date.recent(),
      totalVenta: faker.number.bigInt({min: 1000, max: 100000}),
      precioUnitario: faker.number.bigInt({min: 1000, max: 100000}),
      cantidad: faker.number.bigInt({min: 1, max: 10}),
    }));

    const clientesEntities = await this.dClienteRepository.find();
    const tiendasEntities = await this.dTiendaRepository.find();
    const promocionesEntities = await this.dPromocionRepository.find();
    const productosEntities = await this.dProductoRepository.find();
    const horasEntities = await this.dHoraRepository.find();

    ventas.forEach((venta, index) => {
      venta.cliente = clientesEntities[index % fakeDataCount];
      venta.tienda = tiendasEntities[index % fakeDataCount];
      venta.promocion = promocionesEntities[index % fakeDataCount];
      venta.producto = productosEntities[index % fakeDataCount];
      venta.hora = horasEntities[index % fakeDataCount];
    });

    await this.hVentaRepository.save(ventas);
    this.logger.debug('DATA INSERTED...')
  }
}

