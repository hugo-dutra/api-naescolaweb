import { EscopoPerfilUsuario } from './escopo-perfil-usuario.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(EscopoPerfilUsuario)
export class EscopoPerfilUsuarioRepository extends Repository<EscopoPerfilUsuario>{ }