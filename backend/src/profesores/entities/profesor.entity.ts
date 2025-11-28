import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Curso } from "../../cursos/entities/curso.entity";

@Entity('profesor')
export class Profesor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    especialidad: string;

    @OneToOne(() => Usuario, usuario => usuario.profesor)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @OneToMany(() => Curso, curso => curso.profesor)
    cursos: Curso[];

}