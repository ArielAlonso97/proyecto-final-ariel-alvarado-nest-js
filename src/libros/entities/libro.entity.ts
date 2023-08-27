import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Autor } from '../../autores/entities/autore.entity';

@Entity('Libros')
export class Libro {
  @PrimaryGeneratedColumn()
  LibrosId: number;

  

  @ManyToOne(() => Autor, autor => autor.libro)
  @JoinColumn({ name: 'AutoresId' })
  autor: Autor;

  @Column()
  AutoresId: number;

  @Column({ type: 'date' })
  fechaDePublicacion: Date;

  @Column()
  titulo: string;

  @Column()
  editorial: string;

  @Column()
  paginas: number;
}
