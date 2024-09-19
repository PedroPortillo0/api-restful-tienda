import { Router } from 'express';
import { getUsuarios, getUsuarioByUUID, createUsuario, updateUsuario, deleteUsuario } from './UsuarioController';

const router = Router();

// Rutas CRUD para usuarios
router.get('/usuarios', getUsuarios);                   // Obtener todos los usuarios
router.get('/usuarios/:uuid', getUsuarioByUUID);        // Obtener un usuario por UUID
router.post('/usuarios', createUsuario);                // Crear un nuevo usuario
router.put('/usuarios/:uuid', updateUsuario);           // Actualizar un usuario por UUID
router.delete('/usuarios/:uuid', deleteUsuario);        // Eliminar un usuario por UUID

export default router;
