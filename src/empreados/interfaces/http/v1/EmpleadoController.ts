import { Request, Response } from 'express';
import { EmpleadoService } from '../../../aplication/EmpleadoService';
import { MySQLEmpleadoRepository } from '../../../infraestructura/MySQLEmpleadoRepository';

const empleadoRepository = new MySQLEmpleadoRepository();
const empleadoService = new EmpleadoService(empleadoRepository);

// Obtener todos los empleados (GET /api/v1/empleados)
export async function getEmpleados(req: Request, res: Response) {
    try {
        const empleados = await empleadoService.getAllEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error });
    }
}

// Obtener un empleado por ID (GET /api/v1/empleados/:id)
export async function getEmpleadoById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const empleado = await empleadoService.getEmpleadoById(id);
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ message: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el empleado', error });
    }
}

// Crear un nuevo empleado (POST /api/v1/empleados)
export async function createEmpleado(req: Request, res: Response) {
    const { nombre, puesto, salario } = req.body;
    try {
        await empleadoService.createEmpleado(nombre, puesto, salario);
        res.status(201).json({ message: 'Empleado creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear empleado', error });
    }
}

// Actualizar un empleado por ID (PUT /api/v1/empleados/:id)
export async function updateEmpleado(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, puesto, salario } = req.body;
    try {
        await empleadoService.updateEmpleado(id, nombre, puesto, salario);
        res.status(200).json({ message: 'Empleado actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar empleado', error });
    }
}

// Eliminar un empleado por ID (DELETE /api/v1/empleados/:id)
export async function deleteEmpleado(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await empleadoService.deleteEmpleado(id);
        res.status(200).json({ message: 'Empleado eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleado', error });
    }
}
