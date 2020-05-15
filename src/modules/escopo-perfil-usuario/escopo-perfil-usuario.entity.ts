import { PerfilUsuario } from './../perfil-usuario/perfil-usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('escopo_perfil_usuario_epu')
export class EscopoPerfilUsuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'epu_id_int' })
  id: number;
  @Column({ length: 100, nullable: false, name: 'epu_nome_txt' })
  epu_nome: string;
  @Column({ nullable: false, name: 'epu_nivel_int', default: 100 })
  epu_nivel: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => PerfilUsuario, perfilUsuario => perfilUsuario.escoposPerfisUsuarios, { eager: true })
  perfilUsuario: PerfilUsuario
}