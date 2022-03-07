import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '35.206.89.189',
  port: 5432,
  username: '',//Get from env
  password: '',//get from env
  database: 'naescola_web',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true //Em produção, isso deve ficar false após o primeiro deploy.
}

export const typeOrmConfig_localhost: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',//Get from env
  password: '',//Get from env
  database: 'naescola_web',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true //Em produção, isso deve ficar false após o primeiro deploy.
}

export const jwtConfig = {
  secret: '',//Get from env
  expired: ''//Get from env
}

