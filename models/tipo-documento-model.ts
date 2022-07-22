class Tipo_DocumentoModel {
    id: string;
    nombre: string;
    descripcion: string;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = "";
        this.nombre = "";
        this.descripcion = "";
    }
}
export default Tipo_DocumentoModel


