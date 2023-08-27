import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Libro } from '../../libros/entities/libro.entity';

@Entity('Autores')
export class Autor {
  @PrimaryGeneratedColumn()
  AutoresId: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @OneToMany(() => Libro, libro => libro.autor)
  libro: Libro[];
}
