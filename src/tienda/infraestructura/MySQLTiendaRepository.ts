import { TiendaRepository } from '../domain/TiendaRepository';
import { Tienda } from '../domain/Tienda';
import pool from './dbConnection';  // Importa la conexión a la base de datos
import { ResultSetHeader } from 'mysql2';

export class MySQLTiendaRepository implements TiendaRepository {
    findTiendasByUsuarioId(usuarioUuid: string): Promise<Tienda[]> {
        throw new Error('Method not implemented.');
    }
    findTiendaById(uuid: string): Promise<Tienda | null> {
        throw new Error('Method not implemented.');
    }
    createTienda(tienda: Tienda): Promise<Tienda> {
        throw new Error('Method not implemented.');
    }
    updateTienda(uuid: string, tienda: Partial<Tienda>): Promise<Tienda | null> {
        throw new Error('Method not implemented.');
    }
    deleteTienda(uuid: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    // Obtener todas las tiendas
    async findAll(): Promise<Tienda[]> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM tiendas');
        return rows.map((row: any) => new Tienda(row.uuid, row.nombre, row.direccion, row.usuarioUuid));
    }

    // Obtener una tienda por UUID
    async findByUUID(uuid: string): Promise<Tienda | null> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM tiendas WHERE uuid = ?', [uuid]);
        if (rows.length === 0) return null;

        const tienda = rows[0];
        return new Tienda(tienda.uuid, tienda.nombre, tienda.direccion, tienda.usuarioUuid);
    }

// Crear una nueva tienda
    async create(tienda: Tienda): Promise<void> {
        const query = 'INSERT INTO tiendas (uuid, nombre, direccion, usuarioUuid) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute<ResultSetHeader>(query, [tienda.uuid, tienda.nombre, tienda.direccion, tienda.usuarioUuid]);

        // Asignar el ID generado por MySQL si el resultado es válido
        if (result && result.insertId) {
            tienda.id = result.insertId;  // Asignamos el id generado por MySQL
        }   
    }

    // Actualizar una tienda por UUID
    async update(uuid: string, tienda: Tienda): Promise<void> {
        const query = 'UPDATE tiendas SET nombre = ?, direccion = ?, usuarioUuid = ? WHERE uuid = ?';
        await pool.execute(query, [tienda.nombre, tienda.direccion, tienda.usuarioUuid, uuid]);
    }

    // Eliminar una tienda por UUID
    async delete(uuid: string): Promise<void> {
        const query = 'DELETE FROM tiendas WHERE uuid = ?';
        await pool.execute(query, [uuid]);
    }
}
