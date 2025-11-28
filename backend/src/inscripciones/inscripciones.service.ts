import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { Inscripcion } from './entities/inscripcion.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { CursosService } from 'src/cursos/cursos.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class InscripcionesService {

  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    private readonly estudiantesService: EstudiantesService,
    private readonly cursosService: CursosService,
  ) {}

  async create(createInscripcionDto: CreateInscripcionDto) {
    const estudiante = await this.estudiantesService.findOne(createInscripcionDto.estudiante_id);
    const curso = await this.cursosService.findOne(createInscripcionDto.curso_id);
    
    const inscripcion = this.inscripcionRepository.create({
      ...createInscripcionDto,
      estudiante,
      curso,
    });
    return await this.inscripcionRepository.save(inscripcion);
  }

  async createSimple(createInscripcionDto: Omit<CreateInscripcionDto, 'estudiante_id'>, user: Usuario) {
    // Obtener el estudiante asociado al usuario logueado
    const estudiante = await this.estudiantesService.findByUsuarioId(user.id);
    const curso = await this.cursosService.findOne(createInscripcionDto.curso_id);
    
    const inscripcion = this.inscripcionRepository.create({
      fecha_inscripcion: createInscripcionDto.fecha_inscripcion,
      estudiante,
      curso,
    });
    return await this.inscripcionRepository.save(inscripcion);
  }

  async findAll() {
    return await this.inscripcionRepository.find({ relations: ['estudiante', 'estudiante.usuario', 'curso'] });
  }

  async findOne(id: number) {
    const inscripcion = await this.inscripcionRepository.findOne({ 
        where: { id },
        relations: ['estudiante', 'estudiante.usuario', 'curso']
    });
    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    }
    return inscripcion;
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto) {
    const inscripcion = await this.findOne(id);
    this.inscripcionRepository.merge(inscripcion, updateInscripcionDto);
    return await this.inscripcionRepository.save(inscripcion);
  }

  async remove(id: number) {
    const inscripcion = await this.findOne(id);
    return await this.inscripcionRepository.remove(inscripcion);
  }
}
