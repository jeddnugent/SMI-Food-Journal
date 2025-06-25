import { Pool } from "pg";
import dotnev from "dotenv";


dotnev.config({
	path: `.env.development`
});


const dbUrl = new URL(process.env.DATABASE_URL);

const pool = new Pool({
	user: dbUrl.username,
	host: dbUrl.hostname,
	database: dbUrl.pathname.slice(1),
	password: dbUrl.password,
	port: parseInt(dbUrl.port),
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
});

export default pool;