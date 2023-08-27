import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrosModule } from './libros/libros.module';
import { AutoresModule } from './autores/autores.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [LibrosModule, AutoresModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'distribuidoradelibros',
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Corrección aquí
    synchronize: false,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

