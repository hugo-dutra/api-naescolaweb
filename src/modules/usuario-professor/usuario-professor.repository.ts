import { UsuarioProfessor } from './usuario-professor.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(UsuarioProfessor)
export class UsuarioProfessorRepository extends Repository<UsuarioProfessor>{ }