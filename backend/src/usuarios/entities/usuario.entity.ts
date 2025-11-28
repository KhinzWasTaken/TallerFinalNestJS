import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Profesor } from "../../profesores/entities/profesor.entity";

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre_completo: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'enum', enum: ['profesor', 'estudiante']})
    rol: string;

    
    
    @OneToOne(() => Profesor, profesor => profesor.usuario)
    profesor: Profesor;

    @OneToOne(() => Estudiante, estudiante => estudiante.usuario)
    estudiante: Estudiante;

}
