import { cwd, env } from 'process';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

// https://github.com/typeorm/typeorm/issues/8810#issuecomment-1156345511

const detectTSNode = !!process[Symbol.for('ts-node.register.instance')];
const fileExtension = detectTSNode ? '.ts' : '.js';

const commonConfig = {
  type: 'postgres' as const,
  host: env.POSTGRES_HOST,
  port: +env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: false,
  dropSchema: false,
  migrationsTableName: 'migrations',
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...commonConfig,
  autoLoadEntities: true,
};

export const dataSource = new DataSource({
  ...commonConfig,
  entities: [cwd() + '/**/*.entity' + fileExtension],
  migrations: [cwd() + '/**/migrations/*' + fileExtension],
});
