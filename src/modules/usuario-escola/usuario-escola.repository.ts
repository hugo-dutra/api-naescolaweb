import { UsuarioEscola } from "./usuario-escola.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(UsuarioEscola)
export class UsuarioEscolaRespository extends Repository<UsuarioEscola>{ }