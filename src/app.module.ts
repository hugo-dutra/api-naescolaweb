import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RedeEnsinoModule } from './modules/rede-ensino/rede-ensino.module';
import { RegiaoEscolaModule } from './modules/regiao-escola/regiao-escola.module';
import { EscolaModule } from './modules/escola/escola.module';
import { DiretorModule } from './modules/diretor/diretor.module';
import { DiretorEscolaModule } from './modules/diretor-escola/diretor-escola.module';
import { TurnoModule } from './modules/turno/turno.module';
import { EtapaEnsinoModule } from './modules/etapa-ensino/etapa-ensino.module';
import { SerieModule } from './modules/serie/serie.module';
import { TurmaModule } from './modules/turma/turma.module';
import { BoletoMensalidadeModule } from './modules/boleto-mensalidade/boleto-mensalidade.module';
import { EstudanteModule } from './modules/estudante/estudante.module';
import { EstudanteTurmaModule } from './modules/estudante-turma/estudante-turma.module';
import { TelefoneContatoEstudanteModule } from './modules/telefone-contato-estudante/telefone-contato-estudante.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EscopoPerfilUsuarioModule } from './modules/escopo-perfil-usuario/escopo-perfil-usuario.module';
import { PerfilUsuarioModule } from './modules/perfil-usuario/perfil-usuario.module';
import { UsuarioEscolaModule } from './modules/usuario-escola/usuario-escola.module';
import { GrupoAcessoModule } from './modules/grupo-acesso/grupo-acesso.module';
import { MenuAcessoModule } from './modules/menu-acesso/menu-acesso.module';
import { PermissaoAcessoModule } from './modules/permissao-acesso/permissao-acesso.module';
import { PerfilPermissaoModule } from './modules/perfil-permissao/perfil-permissao.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RedeEnsinoModule,
    RegiaoEscolaModule,
    EscolaModule,
    DiretorModule,
    DiretorEscolaModule,
    TurnoModule,
    EtapaEnsinoModule,
    SerieModule,
    TurmaModule,
    BoletoMensalidadeModule,
    EstudanteModule,
    EstudanteTurmaModule,
    TelefoneContatoEstudanteModule,
    UsuarioModule,
    EscopoPerfilUsuarioModule,
    PerfilUsuarioModule,
    UsuarioEscolaModule,
    GrupoAcessoModule,
    MenuAcessoModule,
    PermissaoAcessoModule,
    PerfilPermissaoModule,
  ],
})
export class AppModule { }
