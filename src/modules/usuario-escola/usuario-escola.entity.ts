import { PerfilUsuario } from './../perfil-usuario/perfil-usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('usuario_escola_use')
export class UsuarioEscola extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'use_id_int' })
  id: number;
  @Column({ nullable: false, default: 1, name: 'use_status_ativo' })
  status_ativo: number;
  @Column({ name: 'pru_id_int' })
  pru_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => PerfilUsuario, perfilUsuario => perfilUsuario.usuariosEscolas)
  @JoinColumn({ name: 'pru_id_int' })
  perfilUsuario: PerfilUsuario;
  @ManyToOne(type => Usuario, usuario => usuario.usuariosEscolas)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola.usuariosEscolas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;



}