import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PostgresConfigKeys } from './helpers/helpers';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { FakeDataService } from './app.service';
import { DCliente } from './schema/cliente.schema';
import { DHora } from './schema/hora.schema';
import { DProducto } from './schema/producto.schema';
import { DPromocion } from './schema/promocion.schema';
import { DTienda } from './schema/tienda.schema';
import { HVenta } from './schema/venta.schema';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: PostgresConfigKeys.TYPE,
          host: config.get(PostgresConfigKeys.POSTGRES_HOST),
          port: config.get(PostgresConfigKeys.POSTGRES_PORT),
          username: config.get(PostgresConfigKeys.POSTGRES_USERNAME),
          password: config.get(PostgresConfigKeys.POSTGRES_PASSWORD),
          database: config.get(PostgresConfigKeys.POSTGRES_DATABASE),
          schema: config.get(PostgresConfigKeys.POSTGRES_SCHEMA),
          autoLoadEntities: true,
          synchronize: true,
        } as unknown as PostgresConnectionOptions ;
      },
    }),
    TypeOrmModule.forFeature([ DCliente, DHora, DProducto, DPromocion, DTienda, HVenta]),
  ],
  controllers: [AppController],
  providers: [FakeDataService]
})
export class AppModule { 
  static POSTGRES_PORT: number;
  static POSTGRES_HOST: string;
  static POSTGRES_USERNAME: string;
  static POSTGRES_PASSWORD: string;
  static POSTGRES_DATABASE: string;
  static POSTGRES_SCHEMA: string;

  constructor(private configService: ConfigService) {
    AppModule.POSTGRES_PORT = this.configService.get(
      PostgresConfigKeys.POSTGRES_PORT,
    );
    AppModule.POSTGRES_HOST = this.configService.get(
      PostgresConfigKeys.POSTGRES_HOST,
    );
    AppModule.POSTGRES_USERNAME = this.configService.get(
      PostgresConfigKeys.POSTGRES_USERNAME,
    );
    AppModule.POSTGRES_PASSWORD = this.configService.get(
      PostgresConfigKeys.POSTGRES_PASSWORD,
    );
    AppModule.POSTGRES_DATABASE = this.configService.get(
      PostgresConfigKeys.POSTGRES_DATABASE,
    );
    AppModule.POSTGRES_SCHEMA = this.configService.get(
      PostgresConfigKeys.POSTGRES_SCHEMA,
    );
  }
}