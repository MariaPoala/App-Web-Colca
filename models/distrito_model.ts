class DistritoModel {
    id: string;
    fecha_creacion: string;
    nombre: string;
    descripcion: string;
    codigo_postal: string

    constructor() {
        this.id = "";
        this.fecha_creacion = Date.now.toString();
        this.nombre = "";
        this.descripcion = "";
        this.codigo_postal = "";
    }
}
export default DistritoModel


