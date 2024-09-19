import { Empleado } from './empleados';

export interface IEmpleadoRepository {
    findAll(): Promise<Empleado[]>;
    findById(id: string): Promise<Empleado | null>;
    create(empleado: Empleado): Promise<void>;
    update(id: string, empleado: Empleado): Promise<void>;
    delete(id: string): Promise<void>;
}
