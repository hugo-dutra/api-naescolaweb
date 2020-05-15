import { Repository, EntityRepository } from "typeorm";
import { PermissaoAcesso } from "./permissao-acesso.entity";

@EntityRepository(PermissaoAcesso)
export class PermissaoAcessoRepository extends Repository<PermissaoAcesso>{ }