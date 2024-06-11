import { PostgreSQLAdapter } from '@builderbot/database-postgres'

const POSTGRES_DB_HOST = process.env.BOT_WHATSAPP_POSTGRES_DB_HOST ?? 'localhost';
const POSTGRES_DB_USER = process.env.BOT_WHATSAPP_POSTGRES_DB_USER ?? 'postgres'
const POSTGRES_DB_NAME = process.env.BOT_WHATSAPP_POSTGRES_DB_NAME ?? 'botwhatsapp';
const POSTGRES_DB_PASSWORD = process.env.BOT_WHATSAPP_POSTGRES_DB_PASSWORD ?? '';
const POSTGRES_DB_PORT = process.env.BOT_WHATSAPP_POSTGRES_DB_PORT ?? '5432';

export type IDatabase = typeof PostgreSQLAdapter
export const postgreSQLDB = new PostgreSQLAdapter({
    host: POSTGRES_DB_HOST,
    user: POSTGRES_DB_USER,
    database: POSTGRES_DB_NAME,
    password: POSTGRES_DB_PASSWORD,
    port: +POSTGRES_DB_PORT,
})
