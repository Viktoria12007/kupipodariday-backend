import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from 'path';
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      autoLoadEntities: true,
      // entities: [join(__dirname, '../**/*.entity{.ts,.js}')], // не нужно, если установлен 'autoLoadEntities: true'
      synchronize: true,
    }
  }
}
