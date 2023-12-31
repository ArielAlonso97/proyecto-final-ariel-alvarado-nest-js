import { Module } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from '../autores/entities/autore.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Autor]),
  ],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
