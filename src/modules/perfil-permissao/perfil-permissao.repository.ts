import { Repository, EntityRepository } from "typeorm";
import { PerfilPermissao } from "./perfil-permissao.entity";

@EntityRepository(PerfilPermissao)
export class PerfilPermissaoRepository extends Repository<PerfilPermissao>{ }