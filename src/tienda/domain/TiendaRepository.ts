import { Tienda } from './Tienda';

export interface TiendaRepository {
    findTiendasByUsuarioId(usuarioUuid: string): Promise<Tienda[]>;
    findTiendaById(uuid: string): Promise<Tienda | null>;
    createTienda(tienda: Tienda): Promise<Tienda>;
    updateTienda(uuid: string, tienda: Partial<Tienda>): Promise<Tienda | null>;
    deleteTienda(uuid: string): Promise<void>;
}
