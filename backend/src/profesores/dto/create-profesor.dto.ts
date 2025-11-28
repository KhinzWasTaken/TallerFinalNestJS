import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfesorDto {
    
    @IsNotEmpty({ message: 'La especialidad es obligatoria' })
    @IsString({ message: 'La especialidad debe ser un texto' })
    especialidad: string;

    @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
    @IsNumber({}, { message: 'El ID de usuario debe ser un número' })
    usuario_id: number;
}
