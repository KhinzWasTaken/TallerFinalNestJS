import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import { Profesor } from "../../profesores/entities/profesor.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";

@Entity('curso')
export class Curso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'int' })
    creditos: number;

    @ManyToOne(() => Profesor, profesor => profesor.cursos)
    @JoinColumn({ name: 'profesor_id' })
    profesor: Profesor;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.curso)
    inscripciones: Inscripcion[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}