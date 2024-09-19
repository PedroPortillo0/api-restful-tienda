import { IEmpleadoRepository } from '../domain/IEmpleadoRepository';
import { Empleado } from '../domain/empleados';

export class EmpleadoService {
    constructor(private empleadoRepository: IEmpleadoRepository) {}

    // Obtener todos los empleados
    async getAllEmpleados(): Promise<Empleado[]> {
        return await this.empleadoRepository.findAll();
    }

    // Obtener un empleado por ID
    async getEmpleadoById(id: string): Promise<Empleado | null> {
        return await this.empleadoRepository.findById(id);
    }

    // Crear un nuevo empleado
    async createEmpleado(nombre: string, puesto: string, salario: number): Promise<void> {
        const empleado = new Empleado('', nombre, puesto, salario);  // Genera UUID automáticamente
        await this.empleadoRepository.create(empleado);
    }

    // Actualizar un empleado
    async updateEmpleado(id: string, nombre: string, puesto: string, salario: number): Promise<void> {
        const empleado = new Empleado(id, nombre, puesto, salario);  // Reutiliza el mismo UUID
        await this.empleadoRepository.update(id, empleado);
    }

    // Eliminar un empleado
    async deleteEmpleado(id: string): Promise<void> {
        await this.empleadoRepository.delete(id);
    }
}
