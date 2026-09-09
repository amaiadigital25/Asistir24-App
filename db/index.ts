import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | undefined;
export function getDb(){const url=process.env.DATABASE_URL;if(!url)throw new Error("DATABASE_URL no está configurada");client??=postgres(url,{max:5,prepare:false,ssl:process.env.NODE_ENV==="production"?"require":false});return drizzle(client,{schema})}
