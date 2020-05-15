import { Module } from '@nestjs/common';
import { MenuAcessoService } from './menu-acesso.service';
import { MenuAcessoController } from './menu-acesso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuAcessoRepository } from './menu-acesso.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuAcessoRepository])],
  providers: [MenuAcessoService],
  controllers: [MenuAcessoController]
})
export class MenuAcessoModule { }
