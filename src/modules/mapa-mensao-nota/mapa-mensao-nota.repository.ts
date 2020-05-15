import { MapaMensaoNota } from './mapa-mensao-nota.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(MapaMensaoNota)
export class MapaMensaoNotaRepository extends Repository<MapaMensaoNota>{ }