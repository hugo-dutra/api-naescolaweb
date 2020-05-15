import { EntidadeEstudantilRepository } from './entidade-estudantil.repository';
import { Module } from '@nestjs/common';
import { EntidadeEstudantilService } from './entidade-estudantil.service';
import { EntidadeEstudantilController } from './entidade-estudantil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadeEstudantilRepository])],
  providers: [EntidadeEstudantilService],
  controllers: [EntidadeEstudantilController]
})
export class EntidadeEstudantilModule { }
