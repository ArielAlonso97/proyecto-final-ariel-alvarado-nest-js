import { IsString } from 'class-validator';

export class CreateAutoreDto {


    @IsString()
    nombre: string;

    @IsString()
    apellidos: string;
}
