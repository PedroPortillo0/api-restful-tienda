import { v4 as uuidv4 } from 'uuid';

export class Usuario {
    public uuid: string;
    public id: number | null;

    constructor(
        uuid: string | null = null,  // Genera automáticamente el UUID si es null
        id: number | null = null,    // ID autogenerado por la base de datos
        public nombre: string,
        public email: string,
        public password: string
    ) {
        this.uuid = uuid || uuidv4();  // Genera UUID automáticamente si no se proporciona
        this.id = id;
    }
}
