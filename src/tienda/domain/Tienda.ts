export class Tienda {
    constructor(
        public uuid: string,       // UUID de la tienda
        public nombre: string,     // Nombre de la tienda
        public direccion: string,  // Dirección de la tienda
        public usuarioUuid: string, // UUID del usuario
        public id?: number         // ID generado por MySQL (opcional)
    ) {}
}
