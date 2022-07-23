class DocumentoModel {
    id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    tiempo_entrega: number;
    costo: number;
    id_grupo: string;
    id_tipo_documento: string;
    id_consideracion: string[];
    id_requisito: string[];
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.codigo = "";
        this.descripcion = "";
        this.tiempo_entrega = 0;
        this.costo = 0;
        this.id_grupo ="";
        this.id_tipo_documento = "";
        this.id_consideracion = [];
        this.id_requisito = [];
    }
}
export default DocumentoModel


