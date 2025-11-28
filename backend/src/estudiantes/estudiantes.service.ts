import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class EstudiantesService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const usuario = await this.usuariosService.findOne(createEstudianteDto.usuario_id);
    
    if (usuario.rol !== 'estudiante') {
      throw new BadRequestException('El usuario no tiene el rol de estudiante');
    }

    const existingEstudiante = await this.estudianteRepository.findOneBy({ usuario: { id: usuario.id } });
    if (existingEstudiante) {
        throw new BadRequestException('El usuario ya tiene un perfil de estudiante');
    }

    const estudiante = this.estudianteRepository.create({
      ...createEstudianteDto,
      usuario,
    });
    return await this.estudianteRepository.save(estudiante);
  }

  async findAll() {
    return await this.estudianteRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'inscripciones', 'inscripciones.curso', 'inscripciones.curso.profesor', 'inscripciones.curso.profesor.usuario']
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  async findByUsuarioId(usuario_id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { usuario: { id: usuario_id } },
      relations: ['usuario']
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con usuario ID ${usuario_id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.findOne(id);
    this.estudianteRepository.merge(estudiante, updateEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);
    return await this.estudianteRepository.remove(estudiante);
  }
}
