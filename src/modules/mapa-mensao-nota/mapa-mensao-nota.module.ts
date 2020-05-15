import { MapaMensaoNotaRepository } from './mapa-mensao-nota.repository';
import { Module } from '@nestjs/common';
import { MapaMensaoNotaService } from './mapa-mensao-nota.service';
import { MapaMensaoNotaController } from './mapa-mensao-nota.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MapaMensaoNotaRepository])],
  providers: [MapaMensaoNotaService],
  controllers: [MapaMensaoNotaController]
})
export class MapaMensaoNotaModule { }
