import { PerfilUsuario } from './perfil-usuario.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(PerfilUsuario)
export class PerfilUsuarioRepository extends Repository<PerfilUsuario>{ }