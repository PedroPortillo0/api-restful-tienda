import { Request, Response } from 'express';
import { UsuarioService } from '../../../aplication/UsuarioService';
import { MySQLUsuarioRepository } from '../../../infraestructura/MySQLUsuarioRepository';

const usuarioRepository = new MySQLUsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

// Obtener todos los usuarios
export async function getUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
}

// Obtener un usuario por UUID
export async function getUsuarioByUUID(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
        const usuario = await usuarioService.getUsuarioByUUID(uuid);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
}

// Crear un nuevo usuario
export async function createUsuario(req: Request, res: Response) {
    const { nombre, email, password } = req.body;
    try {
        await usuarioService.createUsuario(nombre, email, password);
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
}

// Actualizar un usuario
export async function updateUsuario(req: Request, res: Response) {
    const { uuid } = req.params;
    const { nombre, email, password } = req.body;

    try {
        await usuarioService.updateUsuario(uuid, nombre, email, password);
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
}

// Eliminar un usuario
export async function deleteUsuario(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
        await usuarioService.deleteUsuario(uuid);
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
}
