import express from 'express';
import bodyParser from 'body-parser';
import empleadoRoutes from './empreados/interfaces/http/v1/routes'; 
import usuarioRoutes from './usuario/interfaces/http/v1/routes'; 
import pool from './empreados/infraestructura/dbConnection'; 

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

(async () => {
    try {
        const [result] = await pool.query('SELECT 1');
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();


app.use('/api/v1/', empleadoRoutes);  
app.use('/api/v1/', usuarioRoutes);    

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
