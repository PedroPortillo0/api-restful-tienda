import { v4 as uuidv4 } from 'uuid';

export class Empleado {
    public uuid: string;
    public id: number | null;

    constructor(
        uuid: string | null = null,  // Deja que sea null para que se genere automáticamente si es necesario
        id: number | null = null,
        public nombre: string,
        public puesto: string,
        public salario: number
    ) {
        this.uuid = uuid || uuidv4();  // Genera un UUID automáticamente si no se proporciona
        this.id = id;  // El ID es generado por MySQL
    }
}
