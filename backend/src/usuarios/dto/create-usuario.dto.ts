import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
    
    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    @IsString({ message: 'El nombre completo debe ser un texto' })
    nombre_completo: string;

    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsNotEmpty({ message: 'El rol es obligatorio' })
    @IsEnum(['profesor', 'estudiante'], { message: 'El rol debe ser profesor o estudiante' })
    rol: string;
}
