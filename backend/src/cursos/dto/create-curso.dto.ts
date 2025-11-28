import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateCursoDto {
    
    @IsNotEmpty({ message: 'El nombre del curso es obligatorio' })
    @IsString({ message: 'El nombre debe ser un texto' })
    nombre: string;

    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser un texto' })
    descripcion: string;

    @IsNotEmpty({ message: 'Los créditos son obligatorios' })
    @IsNumber({}, { message: 'Los créditos deben ser un número' })
    @Min(1, { message: 'Los créditos deben ser al menos 1' })
    creditos: number;

    @IsNotEmpty({ message: 'El ID del profesor es obligatorio' })
    @IsNumber({}, { message: 'El ID del profesor debe ser un número' })
    @IsPositive({ message: 'El ID del profesor debe ser un número positivo' })
    profesor_id: number;
}
