import { Repository, EntityRepository } from "typeorm";
import { Portaria } from "./portaria.entity";

@EntityRepository(Portaria)
export class PortariaRepository extends Repository<Portaria>{ }