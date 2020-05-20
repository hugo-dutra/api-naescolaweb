import { Repository, EntityRepository } from "typeorm";
import { BoletimEscolar } from "./boletim-escolar.entity";

@EntityRepository(BoletimEscolar)
export class BoletimEscolaRepository extends Repository<BoletimEscolar>{ }