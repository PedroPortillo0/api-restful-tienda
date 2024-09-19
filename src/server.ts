import express from 'express';
import bodyParser from 'body-parser';
import empleadoRoutes from './empreados/interfaces/http/v1/routes'; // Corrige el nombre de la carpeta
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
app.use('/api/v1', empleadoRoutes);

// Servidor escuchando en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
