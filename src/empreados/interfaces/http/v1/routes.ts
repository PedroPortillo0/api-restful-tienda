import { Router } from 'express';
import { getEmpleados, getEmpleadoByUUID, createEmpleado, updateEmpleadoByUUID, deleteEmpleadoByUUID } from './EmpleadoController';

const router = Router();

// Rutas CRUD para empleados con UUID
router.get('/empleados', getEmpleados);                    // Obtener todos los empleados
router.get('/empleados/:uuid', getEmpleadoByUUID);         // Obtener un empleado por UUID
router.post('/empleados', createEmpleado);                 // Crear un nuevo empleado
router.put('/empleados/:uuid', updateEmpleadoByUUID);      // Actualizar un empleado por UUID
router.delete('/empleados/:uuid', deleteEmpleadoByUUID);   // Eliminar un empleado por UUID

export default router;
