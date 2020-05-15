import { Repository, EntityRepository } from "typeorm";
import { ModeloCartao } from "./modelo-cartao.entity";

@EntityRepository(ModeloCartao)
export class ModeloCartaoRepository extends Repository<ModeloCartao>{ }