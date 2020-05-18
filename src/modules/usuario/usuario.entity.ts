import { PendenciaCarteirinha } from './../pendencia-carteirinha/pendencia-carteirinha.entity';
import { AtestadoMedico } from './../atestado-medico/atestado-medico.entity';
import { ObservacaoTurma } from './../observacao-turma/observacao-turma.entity';
import { ObservacaoEstudante } from './../observacao-estudante/observacao-estudante.entity';
import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { PedidoCartao } from '../pedido-cartao/pedido-cartao.entity';

@Entity('usuario_usr')
export class Usuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'usr_id_int' })
  id: number;
  @Column({ length: 200, name: 'usr_nome_txt', nullable: false })
  usr_nome: string;
  @Column({ length: 200, name: 'usr_senha_txt', nullable: false })
  usr_senha: string;
  @Column({ length: 200, name: 'usr_email_txt', nullable: false })
  usr_email: string;
  @Column({ length: 200, name: 'usr_salt_txt', nullable: false })
  usr_salt: string;
  @Column({ length: 500, name: 'usr_foto_txt' })
  usr_foto: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => UsuarioEscola, usuarioEscola => usuarioEscola.usuario, { eager: false })
  usuariosEscolas: UsuarioEscola[];
  @OneToOne(type => PedidoCartao, pedidoCartao => pedidoCartao.usuario, { eager: false })
  pedidosCartoes: PedidoCartao[];
  @OneToMany(type => ObservacaoEstudante, observacaoEstudante => observacaoEstudante.usuario, { eager: true })
  observacoesEstudantes: ObservacaoEstudante[];
  @OneToMany(type => ObservacaoTurma, observacaoTurma => observacaoTurma.usuario, { eager: true })
  observacoesTurmas: ObservacaoTurma[];
  @OneToMany(type => AtestadoMedico, atestadoMedico => atestadoMedico.usuario, { eager: true })
  atestadosMedicos: AtestadoMedico[];
  @OneToMany(type => PendenciaCarteirinha, pendenciaCarteirinha => pendenciaCarteirinha.usuario, { eager: true })
  pendenciasCarteirinhas: PendenciaCarteirinha[];
}