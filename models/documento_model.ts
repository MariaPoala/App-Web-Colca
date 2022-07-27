class DocumentoModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    id_tipo_documento: number;
    numero_documento: string;
    observacion: string;
    fecha_documento: string;
    url_archivo?: string;
    es_anulado: boolean;
    fecha_anulacion?: string;
    motivo_anulacion?: string;
    id_empleado: number;
    id_empresa?: number;
    id_persona: number;
    

    constructor() {
        this.id = 0;
        this.numero_documento = "";
        this.observacion = "";
        this.fecha_documento = "";
        this.es_anulado = false;
        this.id_empleado = 0;
        this.id_persona = 0;
        this.id_tipo_documento = 0;
    }
}
export default DocumentoModel


