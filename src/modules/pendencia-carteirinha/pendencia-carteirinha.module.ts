import { Module } from '@nestjs/common';
import { PendenciaCarteirinhaService } from './pendencia-carteirinha.service';
import { PendenciaCarteirinhaController } from './pendencia-carteirinha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendenciaCarteirinhaRepository } from './pendencia-carteirinha.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PendenciaCarteirinhaRepository])],
  providers: [PendenciaCarteirinhaService],
  controllers: [PendenciaCarteirinhaController]
})
export class PendenciaCarteirinhaModule { }
