import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ProfesoresService {

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createProfesorDto: CreateProfesorDto) {
    const usuario = await this.usuariosService.findOne(createProfesorDto.usuario_id);
    
    if (usuario.rol !== 'profesor') {
      throw new BadRequestException('El usuario no tiene el rol de profesor');
    }

    const existingProfesor = await this.profesorRepository.findOneBy({ usuario: { id: usuario.id } });
    if (existingProfesor) {
        throw new BadRequestException('El usuario ya tiene un perfil de profesor');
    }

    const profesor = this.profesorRepository.create({
      ...createProfesorDto,
      usuario,
    });
    return await this.profesorRepository.save(profesor);
  }

  async findAll() {
    return await this.profesorRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOne({ 
        where: { id },
        relations: ['usuario']
    });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  async findByUsuarioId(usuario_id: number) {
    const profesor = await this.profesorRepository.findOne({
      where: { usuario: { id: usuario_id } },
      relations: ['usuario']
    });
    if (!profesor) {
      throw new NotFoundException(`Profesor con usuario ID ${usuario_id} no encontrado`);
    }
    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    const profesor = await this.findOne(id);
    this.profesorRepository.merge(profesor, updateProfesorDto);
    return await this.profesorRepository.save(profesor);
  }

  async remove(id: number) {
    const profesor = await this.findOne(id);
    return await this.profesorRepository.remove(profesor);
  }
}
