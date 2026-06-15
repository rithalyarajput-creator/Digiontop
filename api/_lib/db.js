import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_DATABASE_URL);
export { sql };
