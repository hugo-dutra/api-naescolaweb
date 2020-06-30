import { SugestaoUsuario } from '../sugestao-usuario/sugestao-usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';

@Entity('sugestao_usuario_historico_suh')
export class SugestaoUsuarioHistorico extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'suh_id_int' })
  id: number;
  @Column({ name: 'suh_status_modificado_int' })
  status_modificado: number;
  @Column({ name: 'suh_data_alteracao_dte' })
  data_alteracao: Date;
  @Column({ name: 'suh_observacao_txt', length: 1000 })
  observacao: string;
  @Column({ name: 'sus_id_int' })
  sus_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => SugestaoUsuario, sugestaoUsuario => sugestaoUsuario.sugestoesUsuariosHistorico)
  @JoinColumn({ name: 'sus_id_int' })
  sugestaoUsuario: SugestaoUsuario;
  @ManyToOne(type => Usuario, usuario => usuario.sugestoesUsuariosHistorico)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;

}