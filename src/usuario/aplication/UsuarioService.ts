import { IUsuarioRepository } from '../domain/IUsuarioRepository';
import { Usuario } from '../domain/usuario';

export class UsuarioService {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    // Obtener todos los usuarios
    async getAllUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.findAll();
    }

    // Obtener un usuario por UUID
    async getUsuarioByUUID(uuid: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findByUUID(uuid);
    }

    // Crear un nuevo usuario
    async createUsuario(nombre: string, email: string, password: string): Promise<void> {
        const usuario = new Usuario(null, null, nombre, email, password);  // Genera UUID automáticamente
        await this.usuarioRepository.create(usuario);
    }

    // Actualizar un usuario
    async updateUsuario(uuid: string, nombre: string, email: string, password: string): Promise<void> {
        const usuarioExistente = await this.usuarioRepository.findByUUID(uuid);
        if (!usuarioExistente) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = new Usuario(uuid, usuarioExistente.id, nombre, email, password);  // Reutiliza el UUID y el ID
        await this.usuarioRepository.update(uuid, usuario);
    }

    // Eliminar un usuario
    async deleteUsuario(uuid: string): Promise<void> {
        await this.usuarioRepository.delete(uuid);
    }
}
