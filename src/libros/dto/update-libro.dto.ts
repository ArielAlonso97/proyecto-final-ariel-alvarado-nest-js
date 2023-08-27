import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dto';
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

    @IsOptional()
    fechaDePublicacion : Date;

    @IsOptional()           
    @IsString()
    titulo : string;
    
    @IsOptional()
    @IsString()
    editorial : string;
    
    @IsOptional()
    @IsInt()
    paginas : number;

    @IsString()
    nombreAutor:string;

    @IsString()
    apellidoAutor:string 

}
