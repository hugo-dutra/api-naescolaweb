import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('regra_alerta_usuario_rau')
export class RegraAlertaUsuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'rau_id_int' })
  id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => RegraAlerta, regraAlerta => regraAlerta.regrasAlertasUsuarios, { eager: false })
  @JoinColumn({ name: 'ral_id_int' })
  regraAlerta: RegraAlerta;
  @ManyToOne(type => Usuario, usuario => usuario.regrasAlertasUsuarios, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.regrasAlertasUsuarios, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}