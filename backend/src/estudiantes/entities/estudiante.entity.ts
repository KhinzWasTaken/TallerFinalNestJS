import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Inscripcion } from "src/inscripciones/entities/inscripcion.entity";

@Entity('estudiante')
export class Estudiante {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: true })
    ingreso: Date;

    @OneToOne(() => Usuario, usuario => usuario.estudiante)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @OneToMany(() => Inscripcion, inscripcion => inscripcion.estudiante)    
    inscripciones: Inscripcion[];


}