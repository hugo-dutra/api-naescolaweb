import { Repository, EntityRepository } from "typeorm";
import { Estudante } from "./estudante.entity";

@EntityRepository(Estudante)
export class EstudanteReposisoty extends Repository<Estudante>{ }