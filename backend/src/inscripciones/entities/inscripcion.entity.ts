import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Estudiante } from "../../estudiantes/entities/estudiante.entity";
import { Curso } from "../../cursos/entities/curso.entity";

@Entity('inscripcion')
export class Inscripcion {

    @PrimaryGeneratedColumn()
    id: number;

    

    @Column({ type: 'date' })
    fecha_inscripcion: Date;

    @Column({ type: 'integer', nullable: true })
    nota: number;


    @ManyToOne(() => Estudiante, estudiante => estudiante.inscripciones)
    @JoinColumn({ name: 'estudiante_id' })
    estudiante: Estudiante;

    @ManyToOne(() => Curso, curso => curso.inscripciones)
    @JoinColumn({ name: 'curso_id' })
    curso: Curso;
}