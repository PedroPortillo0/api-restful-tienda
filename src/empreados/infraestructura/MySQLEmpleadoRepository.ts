import { IEmpleadoRepository } from '../domain/IEmpleadoRepository';
import { Empleado } from '../domain/empleados';
import pool from './dbConnection';  // Importa la conexión a la base de datos
import { ResultSetHeader } from 'mysql2';  // Importa ResultSetHeader para manejar el tipo de resultado

export class MySQLEmpleadoRepository implements IEmpleadoRepository {
    findById(id: string): Promise<Empleado | null> {
        throw new Error('Method not implemented.');
    }

    // Obtener todos los empleados
    async findAll(): Promise<Empleado[]> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM empleados');
        return rows.map((row: any) => new Empleado(row.uuid, row.id, row.nombre, row.puesto, row.salario));
    }

    // Obtener un empleado por UUID
    async findByUUID(uuid: string): Promise<Empleado | null> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM empleados WHERE uuid = ?', [uuid]);
        if (rows.length === 0) return null;
        const empleado = rows[0];
        return new Empleado(empleado.uuid, empleado.id, empleado.nombre, empleado.puesto, empleado.salario);
    }

    async create(empleado: Empleado): Promise<void> {
        const query = 'INSERT INTO empleados (uuid, nombre, puesto, salario) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute<ResultSetHeader>(query, [empleado.uuid, empleado.nombre, empleado.puesto, empleado.salario]);
    
        if (result && result.insertId) {
            empleado.id = result.insertId;  // Ahora puedes asignar el id
        }
    }

    // Actualizar un empleado por UUID
    async update(uuid: string, empleado: Empleado): Promise<void> {
        const query = 'UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE uuid = ?';
        await pool.execute(query, [empleado.nombre, empleado.puesto, empleado.salario, uuid]);
    }

    // Eliminar un empleado por UUID
    async delete(uuid: string): Promise<void> {
        const query = 'DELETE FROM empleados WHERE uuid = ?';
        await pool.execute(query, [uuid]);
    }
}
