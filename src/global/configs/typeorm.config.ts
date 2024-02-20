import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '3361',
  database: 'peep',
  entities: [],
  synchronize: true,
};

export default typeormConfig;
