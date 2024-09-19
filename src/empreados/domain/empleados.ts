import { v4 as uuidv4 } from 'uuid';

export class Empleado {
    public readonly id: string;

    constructor(
        id: string,
        public nombre: string,
        public puesto: string,
        public salario: number
    ) {
        this.id = id || uuidv4();  // Genera un UUID si no se proporciona
    }
}