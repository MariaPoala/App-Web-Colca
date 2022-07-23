class Consideracion_DocumentoModel {
    id: number;
    id_documento: string;
    id_consideraciones: string[];
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = 0;
        this.id_documento = "";
        this.id_consideraciones = [];
    }
}
export default Consideracion_DocumentoModel


