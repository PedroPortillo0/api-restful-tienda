import { IEmpleadoRepository } from '../domain/IEmpleadoRepository';
import { Empleado } from '../domain/empleados';
import pool from '../infraestructura/dbConnection';  // Importa la conexión a la base de datos

export class MySQLEmpleadoRepository implements IEmpleadoRepository {
    
    // Obtener todos los empleados
    async findAll(): Promise<Empleado[]> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM empleados');
        return rows.map((row: any) => new Empleado(row.id, row.nombre, row.puesto, row.salario));
    }
    
    

    // Obtener un empleado por ID
    async findById(id: string): Promise<Empleado | null> {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const empleado = rows[0];
        return new Empleado(empleado.id, empleado.nombre, empleado.puesto, empleado.salario);
    }
    
    

    // Crear un nuevo empleado
    async create(empleado: Empleado): Promise<void> {
        const query = 'INSERT INTO empleados (id, nombre, puesto, salario) VALUES (?, ?, ?, ?)';
        await pool.execute(query, [empleado.id, empleado.nombre, empleado.puesto, empleado.salario]);
    }

    // Actualizar un empleado por ID
    async update(id: string, empleado: Empleado): Promise<void> {
        const query = 'UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?';
        await pool.execute(query, [empleado.nombre, empleado.puesto, empleado.salario, id]);
    }

    // Eliminar un empleado por ID
    async delete(id: string): Promise<void> {
        const query = 'DELETE FROM empleados WHERE id = ?';
        await pool.execute(query, [id]);
    }
}
