import { RegraAlertaUsuario } from './../regra-alerta-usuario/regra-alerta-usuario.entity';
import { TipoOcorrenciaDisciplinar } from './../tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.entity';
import { OperadorAlerta } from './../operador-alerta/operador-alerta.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('regra_alerta_ral')
export class RegraAlerta extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ral_id_int' })
  id: number;
  @Column({ name: 'ral_data_criacao_dte', nullable: false })
  ral_data_criacao: Date;
  @Column({ name: 'ral_data_inicio_dte' })
  ral_data_inicio: Date;
  @Column({ name: 'ral_data_fim_dte' })
  ral_data_fim: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => OperadorAlerta, operadorAlerta => operadorAlerta.regrasAlertas, { eager: false })
  @JoinColumn({ name: 'opa_id_int' })
  operadorAlerta: OperadorAlerta;
  @ManyToOne(type => TipoOcorrenciaDisciplinar, tipoOcorrenciaDisciplinar => tipoOcorrenciaDisciplinar.regrasAlertas, { eager: false })
  @JoinColumn({ name: 'tod_id_int' })
  tipoOcorrenciaDisciplinar: TipoOcorrenciaDisciplinar;
  @ManyToOne(type => Usuario, usuario => usuario.regrasAlertas, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.regrasAlertas, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => RegraAlertaUsuario, regraAlertaUsuario => regraAlertaUsuario.regraAlerta, { eager: true })
  regrasAlertasUsuarios: RegraAlertaUsuario[];








}