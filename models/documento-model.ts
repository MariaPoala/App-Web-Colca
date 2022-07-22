class DocumentoModel {
    id: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    nro_documento: string;
    tiempo_entrega: number;
    costo: number;
    id_grupo: string;
    id_tipoDocumento: string;
    id_consideracion: string[];
    id_requisito: string[];
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor() {
        this.id = "";
        this.nombre = "";
        this.codigo = "";
        this.descripcion = "";
        this.nro_documento = "";
        this.tiempo_entrega = 0;
        this.costo = 0;
        this.id_grupo ="";
        this.id_tipoDocumento = "";
        this.id_consideracion = [];
        this.id_requisito = [];
    }
}
export default DocumentoModel


