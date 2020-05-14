import { Turno } from "./turno.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Turno)
export class TurnoRepository extends Repository<Turno>{

}