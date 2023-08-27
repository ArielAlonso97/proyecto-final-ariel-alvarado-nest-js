import { Injectable } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autore.entity';

@Injectable()
export class AutoresService {

  constructor(
    @InjectRepository(Autor)
    private readonly autoresRepository: Repository<Autor>,
  ) {}
  z
  async create(createLibroDto: CreateAutoreDto): Promise<Autor[]> {
    const nuevoLibro = this.autoresRepository.create(createLibroDto as any);
    return await this.autoresRepository.save(nuevoLibro);
  }

  async findAll(): Promise<Autor[]> {
    return await this.autoresRepository.find();
  }

  async findOne(id: number): Promise<Autor | undefined> {
    return await this.autoresRepository.findOneById(id);
  }
  
  async update(id: number, updateLibroDto: UpdateAutoreDto): Promise<Autor | undefined> {
    await this.autoresRepository.update(id, updateLibroDto as any);
    return await this.autoresRepository.findOneById(id);
  }
  


  async remove(id: number): Promise<void> {
    await this.autoresRepository.delete(id);
  }
}
