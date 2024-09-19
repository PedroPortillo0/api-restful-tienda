import { Router } from 'express';
import { TiendaService } from '../../../aplication/TiendaService';
import { TiendaController } from './TiendaController';
import { MySQLTiendaRepository } from '../../../infraestructura/MySQLTiendaRepository';

const router = Router();
const tiendaRepository = new MySQLTiendaRepository();
const tiendaService = new TiendaService(tiendaRepository);
const tiendaController = new TiendaController(tiendaService);

// Definir las rutas del CRUD
router.get('/usuarios/:usuarioUuid/tiendas', (req, res) => tiendaController.obtenerTiendasPorUsuario(req, res));
router.get('/tiendas/:uuid', (req, res) => tiendaController.obtenerTiendaPorId(req, res));
router.post('/tiendas', (req, res) => tiendaController.crearTienda(req, res));
router.put('/tiendas/:uuid', (req, res) => tiendaController.actualizarTienda(req, res));
router.delete('/tiendas/:uuid', (req, res) => tiendaController.eliminarTienda(req, res));

export default router;
