import { TiendaRepository } from '../domain/TiendaRepository';
import { Tienda } from '../domain/Tienda';

export class TiendaService {
    constructor(private tiendaRepository: TiendaRepository) {}

    public async getTiendasByUsuario(usuarioUuid: string): Promise<Tienda[]> {
        return this.tiendaRepository.findTiendasByUsuarioId(usuarioUuid);
    }

    public async getTiendaById(uuid: string): Promise<Tienda | null> {
        return this.tiendaRepository.findTiendaById(uuid);
    }

    public async createTienda(tienda: Tienda): Promise<Tienda> {
        return this.tiendaRepository.createTienda(tienda);
    }

    public async updateTienda(uuid: string, tiendaData: Partial<Tienda>): Promise<Tienda | null> {
        return this.tiendaRepository.updateTienda(uuid, tiendaData);
    }

    public async deleteTienda(uuid: string): Promise<void> {
        return this.tiendaRepository.deleteTienda(uuid);
    }
}
