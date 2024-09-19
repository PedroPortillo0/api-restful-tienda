import { Router } from 'express';
import { getEmpleados, getEmpleadoById, createEmpleado, updateEmpleado, deleteEmpleado } from './EmpleadoController';

const router = Router();

// Rutas CRUD para empleados
router.get('/empleados', getEmpleados);               // Obtener todos los empleados
router.get('/empleados/:id', getEmpleadoById);        // Obtener un empleado por ID
router.post('/empleados', createEmpleado);            // Crear un nuevo empleado
router.put('/empleados/:id', updateEmpleado);         // Actualizar un empleado
router.delete('/empleados/:id', deleteEmpleado);      // Eliminar un empleado

export default router;
