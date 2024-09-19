import { Request, Response } from 'express';
import { TiendaService } from '../../../aplication/TiendaService';

export class TiendaController {
    constructor(private tiendaService: TiendaService) {}

    public async obtenerTiendasPorUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { usuarioUuid } = req.params;
            const tiendas = await this.tiendaService.getTiendasByUsuario(usuarioUuid);

            if (!tiendas.length) {
                return res.status(404).json({ message: 'El usuario no tiene tiendas asociadas.' });
            }

            return res.json(tiendas);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener las tiendas', error });
        }
    }

    public async obtenerTiendaPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { uuid } = req.params;
            const tienda = await this.tiendaService.getTiendaById(uuid);

            if (!tienda) {
                return res.status(404).json({ message: 'Tienda no encontrada.' });
            }

            return res.json(tienda);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la tienda', error });
        }
    }

    public async crearTienda(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, direccion, usuarioUuid } = req.body;
            const tienda = await this.tiendaService.createTienda({ uuid: '', nombre, direccion, usuarioUuid });

            return res.status(201).json(tienda);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear la tienda', error });
        }
    }

    public async actualizarTienda(req: Request, res: Response): Promise<Response> {
        try {
            const { uuid } = req.params;
            const tiendaData = req.body;
            const tiendaActualizada = await this.tiendaService.updateTienda(uuid, tiendaData);

            if (!tiendaActualizada) {
                return res.status(404).json({ message: 'Tienda no encontrada.' });
            }

            return res.json(tiendaActualizada);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar la tienda', error });
        }
    }

    public async eliminarTienda(req: Request, res: Response): Promise<Response> {
        try {
            const { uuid } = req.params;
            await this.tiendaService.deleteTienda(uuid);
            return res.status(204).send();  // No Content, tienda eliminada exitosamente
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar la tienda', error });
        }
    }
}
