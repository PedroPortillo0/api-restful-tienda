import { createPool } from 'mysql2/promise';

// Crear un pool de conexiones a la base de datos
const pool = createPool({
    host: 'localhost',       // Dirección del servidor MySQL
    user: 'root',            // Usuario de MySQL
    password: 'password',    // Contraseña del usuario MySQL
    database: 'nombre_base_datos',  // Nombre de la base de datos
    waitForConnections: true,       // Esperar conexiones si el pool está lleno
    connectionLimit: 10,            // Número máximo de conexiones en el pool
    queueLimit: 0                   // Sin límite de solicitudes en la cola de espera
});

export default pool;
