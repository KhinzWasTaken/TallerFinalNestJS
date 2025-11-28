import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { ProfesoresModule } from 'src/profesores/profesores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    ProfesoresModule
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService],
})
export class CursosModule {}
