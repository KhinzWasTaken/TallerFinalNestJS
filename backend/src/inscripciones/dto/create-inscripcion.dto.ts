import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class CreateInscripcionDto {
    
    @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
    @IsNumber({}, { message: 'El ID del estudiante debe ser un número' })
    @IsPositive({ message: 'El ID del estudiante debe ser positivo' })
    estudiante_id: number;

    @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
    @IsNumber({}, { message: 'El ID del curso debe ser un número' })
    @IsPositive({ message: 'El ID del curso debe ser positivo' })
    curso_id: number;

    @IsNotEmpty({ message: 'La fecha de inscripción es obligatoria' })
    @IsDateString({}, { message: 'La fecha de inscripción debe ser una fecha válida' })
    fecha_inscripcion: string;

    @IsOptional()
    @IsNumber({}, { message: 'La nota debe ser un número' })
    @Min(0, { message: 'La nota mínima es 0' })
    @Max(50, { message: 'La nota máxima es 50' })
    nota?: number;
}
