import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
}