import { SugestaoUsuarioHistorico } from './../sugestao-usuario-historico/sugestao-usuario-historico.entity';
import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('sugestao_usuario_sus')
export class SugestaoUsuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'sus_id_int' })
  id: number;
  @Column({ name: 'sus_titulo_txt', length: 100, nullable: false })
  sus_titulo: string;
  @Column({ name: 'sus_mensagem_txt', length: 1000, nullable: false })
  sus_mensagem: string;
  @Column({ name: 'sus_tipo_sugestao_txt', length: 50, nullable: false })
  sus_tipo_sugestao: string;
  @Column({ name: 'sus_data_sugestao_dte', nullable: false })
  sus_data_sugestao: Date;
  @Column({ name: 'sus_status_sugestao_int', nullable: false, default: 0 })
  sus_status_sugestao: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.sugestoesUsuarios)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @ManyToOne(type => Usuario, usuario => usuario.sugestoesUsuarios)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @OneToMany(type => SugestaoUsuarioHistorico, sugestaoUsuarioHistorico => sugestaoUsuarioHistorico.sugestaoUsuario)
  sugestoesUsuariosHistorico: SugestaoUsuarioHistorico[];




}