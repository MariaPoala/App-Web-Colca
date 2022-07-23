class Tipo_DocumentoModel {
    id: number;
    nombre: string;
    descripcion: string;
    url_imagen: string;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.descripcion = "";
        this.url_imagen = "";
    }
}

export default Tipo_DocumentoModel


