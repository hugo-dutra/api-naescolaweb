import { Repository, EntityRepository } from "typeorm";
import { ObservacaoTurma } from "./observacao-turma.entity";

@EntityRepository(ObservacaoTurma)
export class ObservacaoTurmaRepository extends Repository<ObservacaoTurma> { }