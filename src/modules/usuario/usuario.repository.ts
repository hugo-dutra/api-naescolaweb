import { Usuario } from "./usuario.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{ }