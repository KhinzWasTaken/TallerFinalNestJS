import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CursosService {

  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private readonly profesoresService: ProfesoresService,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const profesor = await this.profesoresService.findOne(createCursoDto.profesor_id);
    
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor,
    });
    return await this.cursoRepository.save(curso);
  }

  async createSimple(createCursoDto: Omit<CreateCursoDto, 'profesor_id'>, user: Usuario) {
    const profesor = await this.profesoresService.findByUsuarioId(user.id);
    
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor,
    });
    return await this.cursoRepository.save(curso);
  }

  async findAll() {
    return await this.cursoRepository.find({ relations: ['profesor', 'profesor.usuario'] });
  }

  async findOne(id: number) {
    const curso = await this.cursoRepository.findOne({ 
        where: { id },
        relations: ['profesor', 'profesor.usuario', 'inscripciones', 'inscripciones.estudiante']
    });
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    const curso = await this.findOne(id);
    this.cursoRepository.merge(curso, updateCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    return await this.cursoRepository.remove(curso);
  }
}
