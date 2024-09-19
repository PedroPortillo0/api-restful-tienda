import { Empleado } from './empleados';

export interface IEmpleadoRepository {
    findAll(): Promise<Empleado[]>;
    findById(id: string): Promise<Empleado | null>;
    findByUUID(uuid: string): Promise<Empleado | null>;  // Asegúrate de definir este método
    create(empleado: Empleado): Promise<void>;
    update(uuid: string, empleado: Empleado): Promise<void>;
    delete(uuid: string): Promise<void>;
}
