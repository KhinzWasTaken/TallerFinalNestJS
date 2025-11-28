import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEstudianteDto {
    
    @IsOptional()
    @IsDateString({}, { message: 'La fecha de ingreso debe ser una fecha válida' })
    ingreso?: string;

    @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
    @IsNumber({}, { message: 'El ID de usuario debe ser un número' })
    usuario_id: number;
}
