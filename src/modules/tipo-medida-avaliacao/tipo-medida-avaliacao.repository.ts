import { TipoMedidaAvaliacao } from "./tipo-medida-avaliacao.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(TipoMedidaAvaliacao)
export class TipoMedidaAvaliacaoRepository extends Repository<TipoMedidaAvaliacao> { }