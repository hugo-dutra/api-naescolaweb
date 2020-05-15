import { MenuAcesso } from "./menu-acesso.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(MenuAcesso)
export class MenuAcessoRepository extends Repository<MenuAcesso>{ }