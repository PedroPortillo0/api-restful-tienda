import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',  // Si no hay contraseña, usa una cadena vacía
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)  // Asegúrate de usar DB_PORT
});

export default pool;
