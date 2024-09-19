import { Request, Response } from 'express';
import { MySQLEmpleadoRepository } from '../../../infraestructura/MySQLEmpleadoRepository';
import { Empleado } from '../../../domain/empleados';  // Importar la clase Empleado

const empleadoRepository = new MySQLEmpleadoRepository();

// Obtener todos los empleados
export async function getEmpleados(req: Request, res: Response) {
    try {
        const empleados = await empleadoRepository.findAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los empleados', error });
    }
}

// Obtener un empleado por UUID
export async function getEmpleadoByUUID(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
        const empleado = await empleadoRepository.findByUUID(uuid);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el empleado', error });
    }
}

// Crear un nuevo empleado
export async function createEmpleado(req: Request, res: Response) {
    const { nombre, puesto, salario } = req.body;

    try {
        const empleado = new Empleado(null, null, nombre, puesto, salario); // UUID se generará automáticamente
        await empleadoRepository.create(empleado);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el empleado', error });
    }
}

// Actualizar un empleado por UUID
export async function updateEmpleadoByUUID(req: Request, res: Response) {
    const { uuid } = req.params;
    const { nombre, puesto, salario } = req.body;

    try {
        const empleado = await empleadoRepository.findByUUID(uuid);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        // Actualizamos los campos necesarios
        empleado.nombre = nombre;
        empleado.puesto = puesto;
        empleado.salario = salario;

        await empleadoRepository.update(uuid, empleado);
        res.status(200).json({ message: 'Empleado actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el empleado', error });
    }
}

// Eliminar un empleado por UUID
export async function deleteEmpleadoByUUID(req: Request, res: Response) {
    const { uuid } = req.params;

    try {
        const empleado = await empleadoRepository.findByUUID(uuid);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        await empleadoRepository.delete(uuid);
        res.status(200).json({ message: 'Empleado eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el empleado', error });
    }
}
