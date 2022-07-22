class Consideracion_DocumentoModel {
    id: string;
    id_documento: string;
    id_consideraciones: string[];
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = "";
        this.id_documento = "";
        this.id_consideraciones = [];
    }
}
export default Consideracion_DocumentoModel


