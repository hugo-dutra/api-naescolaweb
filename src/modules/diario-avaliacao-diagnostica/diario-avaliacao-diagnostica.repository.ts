import { Repository, EntityRepository } from "typeorm";
import { DiarioAvaliacaoDiagnostica } from "./diario-avaliacao-diagnostica.entity";

@EntityRepository(DiarioAvaliacaoDiagnostica)
export class DiarioAvaliacaoDiagnosticaRepository extends Repository<DiarioAvaliacaoDiagnostica>{ }