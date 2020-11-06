import { EntityRepository, Repository } from "typeorm";
import { Nota } from "./nota.entity";

@EntityRepository(Nota)
export class NotaRepository extends Repository<Nota>{ }