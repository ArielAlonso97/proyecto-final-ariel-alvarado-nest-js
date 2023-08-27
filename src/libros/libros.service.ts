// src/libros/libros.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './entities/libro.entity';
import { Autor } from '../autores/entities/autore.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { error } from 'console';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
    @InjectRepository(Autor) // Inyecta el repositorio de Autor
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const nuevoLibro = new Libro();

    // Buscar al autor por nombre y apellido en la base de datos
    const autorExistente = await this.autorRepository.findOne({
      where: {
        nombre: createLibroDto.nombreAutor,
        apellidos: createLibroDto.apellidoAutor,
      },
    });

    if (autorExistente) {
      console.log('Ya existe el autor');

      nuevoLibro.AutoresId = autorExistente.AutoresId; // Asignar el ID del autor existente
    } else {
      console.log('Nuevo Autor insertado');

      // Crear un nuevo autor y asignarle nombre y apellido
      const nuevoAutor = new Autor();
      nuevoAutor.nombre = createLibroDto.nombreAutor;
      nuevoAutor.apellidos = createLibroDto.apellidoAutor;

      // Guardar el nuevo autor en la base de datos
      const autor = await this.autorRepository.save(nuevoAutor);
      nuevoLibro.autor = autor; // Asignar la entidad Autor al libro
    }

    nuevoLibro.fechaDePublicacion = createLibroDto.fechaDePublicacion;
    nuevoLibro.titulo = createLibroDto.titulo;
    nuevoLibro.editorial = createLibroDto.editorial;
    nuevoLibro.paginas = createLibroDto.paginas;

    return await this.libroRepository.save(nuevoLibro);
  }

  async findAll(): Promise<Libro[]> {
    return await this.libroRepository.find({ relations: ['autor'] });
  }

  async findOne(id: number): Promise<Libro[] | undefined> {
    return await this.libroRepository.find({
      where: {
        LibrosId: id,
      },
      relations: ['autor'],
    });
  }

  async update(
    id: number,
    updateLibroDto: UpdateLibroDto,
  ): Promise<Libro | undefined> {
    const libroEditar = await this.libroRepository.findOneById(id);
  
    if (!libroEditar) {
      throw new NotFoundException('Libro no encontrado');
    }
  
    const autorExistente = await this.autorRepository.findOne({
      where: {
        nombre: updateLibroDto.nombreAutor,
        apellidos: updateLibroDto.apellidoAutor,
      },
    });
  
    if (autorExistente) {
      libroEditar.autor = autorExistente;
    } else {
      const nuevoAutor = this.autorRepository.create({
        nombre: updateLibroDto.nombreAutor,
        apellidos: updateLibroDto.apellidoAutor,
      });
  
      const autor = await this.autorRepository.save(nuevoAutor);
      libroEditar.autor = autor;
    }
  
    libroEditar.fechaDePublicacion = updateLibroDto.fechaDePublicacion;
    libroEditar.titulo = updateLibroDto.titulo;
    libroEditar.editorial = updateLibroDto.editorial;
    libroEditar.paginas = updateLibroDto.paginas;
  
    await this.libroRepository.save(libroEditar);
  
    // Ahora aquí simplemente retornamos el libro actualizado, sin necesidad de cargar relaciones
    return libroEditar;
  }
  


  async remove(id: number): Promise<void> {
    const libroExistente = await this.libroRepository.findOneById(id);
    if (libroExistente) {
      await this.libroRepository.delete(id);
    } else {
      throw new Error('El libro no existe en la base de datos');
    }
  }
}
