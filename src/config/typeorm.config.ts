import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'had_71048170187',
  database: 'naescola_web',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true //Em produção, isso deve ficar true após o primeiro deploy.
}

