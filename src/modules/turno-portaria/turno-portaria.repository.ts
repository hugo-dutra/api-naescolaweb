import { Repository, EntityRepository } from "typeorm";
import { TurnoPortaria } from "./turno-portaria.entity";

@EntityRepository(TurnoPortaria)
export class TurnoPortariaRepository extends Repository<TurnoPortaria>{ }