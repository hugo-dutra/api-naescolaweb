import { Repository, EntityRepository } from "typeorm";
import { Estudante } from "./estudante.entity";

@EntityRepository(Estudante)
export class EstudanteRepository extends Repository<Estudante>{ }