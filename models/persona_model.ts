class PersonaModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    tipo_documento: string;
    numero_documento: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    direccion: string;
    celular?: string;
    email?: string;
    estado: boolean;
    id_distrito: string;
    id_anexo?: string;

    constructor() {
        this.id = 0;
        this.tipo_documento = "";
        this.numero_documento = "";
        this.nombre = "";
        this.apellido = "";
        this.fecha_nacimiento = "";
        this.direccion = "";
        this.estado = true;
        this.id_distrito = "";
    }
}
export default PersonaModel


