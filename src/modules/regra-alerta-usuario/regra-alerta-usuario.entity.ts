import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('regra_alerta_usuario_rau')
export class RegraAlertaUsuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'rau_id_int' })
  id: number;
  @Column({ name: 'ral_id_int' })
  ral_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => RegraAlerta, regraAlerta => regraAlerta.regrasAlertasUsuarios)
  @JoinColumn({ name: 'ral_id_int' })
  regraAlerta: RegraAlerta;
  @ManyToOne(type => Usuario, usuario => usuario.regrasAlertasUsuarios)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.regrasAlertasUsuarios)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}