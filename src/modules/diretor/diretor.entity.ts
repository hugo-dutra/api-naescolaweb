import { DiretorEscola } from './../diretor-escola/diretor-escola.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('diretor_dir')
export class Diretor extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'dir_id_int' })
  id: number;
  @Column({ length: 150, name: 'dir_nome_txt' })
  nome: string;
  @Column({ length: 25, name: 'dir_telefone_txt' })
  telefone: string;
  @Column({ length: 200, name: 'dir_email_txt' })
  email: string
  @Column({ length: 2000, name: 'dir_foto_txt', nullable: true })
  foto: string
  @Column({ length: 50, name: 'dir_matricula_txt' })
  matricula: string;
  @OneToMany(type => DiretorEscola, diretorEscola => diretorEscola.diretor)
  diretoresEscolas: DiretorEscola[]
}