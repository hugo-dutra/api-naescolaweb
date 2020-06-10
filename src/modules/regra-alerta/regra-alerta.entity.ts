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
  data_criacao: Date;
  @Column({ name: 'ral_data_inicio_dte' })
  data_inicio: Date;
  @Column({ name: 'ral_data_fim_dte' })
  data_fim: Date;
  @Column({ name: 'ral_valor_referencia_int' })
  valor_referencia: number;
  @Column({ name: 'opa_id_int' })
  opa_id: number;
  @Column({ name: 'tod_id_int' })
  tod_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => OperadorAlerta, operadorAlerta => operadorAlerta.regrasAlertas)
  @JoinColumn({ name: 'opa_id_int' })
  operadorAlerta: OperadorAlerta;
  @ManyToOne(type => TipoOcorrenciaDisciplinar, tipoOcorrenciaDisciplinar => tipoOcorrenciaDisciplinar.regrasAlertas)
  @JoinColumn({ name: 'tod_id_int' })
  tipoOcorrenciaDisciplinar: TipoOcorrenciaDisciplinar;
  @ManyToOne(type => Usuario, usuario => usuario.regrasAlertas)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.regrasAlertas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => RegraAlertaUsuario, regraAlertaUsuario => regraAlertaUsuario.regraAlerta)
  regrasAlertasUsuarios: RegraAlertaUsuario[];








}