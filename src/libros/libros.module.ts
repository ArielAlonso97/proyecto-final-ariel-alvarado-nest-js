import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity'
import { Autor } from 'src/autores/entities/autore.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Libro,Autor]),
  ],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
