import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor]),
    UsuariosModule
  ],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports: [ProfesoresService, TypeOrmModule],
})
export class ProfesoresModule {}
