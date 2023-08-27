// create-libro.dto.ts
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLibroDto {

    /* @IsInt()
    AutoresId:number; */

     @IsString()
    nombreAutor:string;

    @IsString()
    apellidoAutor:string 
    

    @IsOptional()
    fechaDePublicacion: Date;

    @IsString()
    titulo: string;

    @IsString()
    editorial: string;

    @IsInt()
    paginas: number;
}
