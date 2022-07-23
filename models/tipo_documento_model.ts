class Tipo_DocumentoModel {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.descripcion = "";
    }
}
export default Tipo_DocumentoModel


