import { Repository, EntityRepository } from "typeorm";
import { DiarioObservacoesGerais } from "./diario-observacoes-gerais.entity";

@EntityRepository(DiarioObservacoesGerais)
export class DiarioObservacoesGeraisRepository extends Repository<DiarioObservacoesGerais>{ }