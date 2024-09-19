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
        const empleado = new Empleado(null, null, nombre, puesto, salario);  // Genera UUID automáticamente
        await this.empleadoRepository.create(empleado);
    }

    // Actualizar un empleado
    async updateEmpleado(uuid: string, nombre: string, puesto: string, salario: number): Promise<void> {
        // Aquí reutilizamos el mismo UUID y ID
        const empleadoExistente = await this.empleadoRepository.findByUUID(uuid);
        if (!empleadoExistente) {
            throw new Error('Empleado no encontrado');
        }
        
        const empleado = new Empleado(uuid, empleadoExistente.id, nombre, puesto, salario);  // Reutiliza el UUID e ID
        await this.empleadoRepository.update(uuid, empleado);
    }

    // Eliminar un empleado
    async deleteEmpleado(uuid: string): Promise<void> {
        await this.empleadoRepository.delete(uuid);
    }
}
