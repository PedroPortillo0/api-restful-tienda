import { IUsuarioRepository } from '../domain/IUsuarioRepository';
import { Usuario } from '../domain/usuario';
import pool from './dbConeccion';  // Importa la conexión a la base de datos
import { ResultSetHeader } from 'mysql2';

export class MySQLUsuarioRepository implements IUsuarioRepository {
    findById(id: string): Promise<Usuario | null> {
        throw new Error('Method not implemented.');
    }

    // Obtener todos los usuarios
    async findAll(): Promise<Usuario[]> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM usuarios');
        return rows.map((row: any) => new Usuario(row.uuid, row.id, row.nombre, row.email, row.password));
    }

    // Obtener un usuario por UUID
    async findByUUID(uuid: string): Promise<Usuario | null> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM usuarios WHERE uuid = ?', [uuid]);
        if (rows.length === 0) return null;

        const usuario = rows[0];
        return new Usuario(usuario.uuid, usuario.id, usuario.nombre, usuario.email, usuario.password);
    }

    // Crear un nuevo usuario
    async create(usuario: Usuario): Promise<void> {
        const query = 'INSERT INTO usuarios (uuid, nombre, email, password) VALUES (?, ?, ?, ?)';
        const [result]: [ResultSetHeader, any] = await pool.execute(query, [usuario.uuid, usuario.nombre, usuario.email, usuario.password]);
        usuario.id = result.insertId;  // Asignar el ID generado por MySQL
    }

    // Actualizar un usuario por UUID
    async update(uuid: string, usuario: Usuario): Promise<void> {
        const query = 'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE uuid = ?';
        await pool.execute(query, [usuario.nombre, usuario.email, usuario.password, uuid]);
    }

    // Eliminar un usuario por UUID
    async delete(uuid: string): Promise<void> {
        const query = 'DELETE FROM usuarios WHERE uuid = ?';
        await pool.execute(query, [uuid]);
    }
}
