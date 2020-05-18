import { Repository, EntityRepository } from "typeorm";
import { SugestaoUsuario } from "./sugestao-usuario.entity";

@EntityRepository(SugestaoUsuario)
export class SugestaoUsuarioRepository extends Repository<SugestaoUsuario>{ }