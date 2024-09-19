import express from 'express';
import bodyParser from 'body-parser';
import empleadoRoutes from './empreados/interfaces/http/v1/routes'; // Rutas de empleados
import usuarioRoutes from './usuario/interfaces/http/v1/routes'; // Rutas de usuarios
// import tiendaRoutes from './usuario/interfaces/http/routes';  // Rutas de tiendas (se incluyen en el archivo de rutas de usuarios)
import pool from './empreados/infraestructura/dbConnection'; // Importa la conexión a la base de datos

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Probar la conexión a la base de datos
(async () => {
    try {
        const [result] = await pool.query('SELECT 1');
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

// Configurar las rutas de la API con prefijo /api/v1
app.use('/api/v1/', empleadoRoutes);  // Rutas de empleados
app.use('/api/v1/', usuarioRoutes);    // Rutas de usuarios (incluye las de tiendas dentro)
// app.use('/api/v1/tiendas', tiendaRoutes);      // Rutas para las tiendas si se necesitan separadas

// Servidor escuchando en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
