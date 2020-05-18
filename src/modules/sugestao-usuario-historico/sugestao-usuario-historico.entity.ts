import { SugestaoUsuario } from './../susgestao-usuario/sugestao-usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';

@Entity('sugestao_usuario_historico_suh')
export class SugestaoUsuarioHistorico extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'suh_id_int' })
  id: number;
  @Column({ name: 'suh_status_modificado_int' })
  suh_status_modificado: number;
  @Column({ name: 'suh_data_alteracao_dte' })
  suh_data_alteracao: Date;
  @Column({ name: 'suh_observacao_txt', length: 1000 })
  suh_observacao: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => SugestaoUsuario, sugestaoUsuario => sugestaoUsuario.sugestoesUsuariosHistorico, { eager: false })
  @JoinColumn({ name: 'sus_id_int' })
  sugestaoUsuario: SugestaoUsuario;
  @ManyToOne(type => Usuario, usuario => usuario.sugestoesUsuariosHistorico, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;

}