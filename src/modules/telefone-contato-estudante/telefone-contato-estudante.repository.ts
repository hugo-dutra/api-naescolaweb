import { TelefoneContatoEstudante } from "./telefone-contato-estudante.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(TelefoneContatoEstudante)
export class TelefoneContatoEstudanteRepository extends Repository<TelefoneContatoEstudante>{ }