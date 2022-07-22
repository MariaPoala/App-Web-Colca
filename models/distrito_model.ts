class DistritoModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    nombre: string;
    descripcion: string;
    codigo_postal: string

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.descripcion = "";
        this.codigo_postal = "";
    }
}
export default DistritoModel


