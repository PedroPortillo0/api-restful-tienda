import { Usuario } from './usuario';

export interface IUsuarioRepository {
    findAll(): Promise<Usuario[]>;
    findById(id: string): Promise<Usuario | null>;
    findByUUID(uuid: string): Promise<Usuario | null>;
    create(usuario: Usuario): Promise<void>;
    update(uuid: string, usuario: Usuario): Promise<void>;
    delete(uuid: string): Promise<void>;
}
