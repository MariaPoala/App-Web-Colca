class Registro_DocumentoModel {
    id: number;
    numero_documento: string;
    observacion: string;
    url_archivo: string;
    id_empleado: string;
    id_ciudadano: string;
    id_documento: string;
    fecha_registro: string;
    fecha_documento: string;
    es_anulado: boolean;
    fecha_anulacion: string;
    motivo: string;
    fecha_creacion?: string;
    fecha_edicion?: string;
    
    
    constructor() {
        let today = new Date()
        this.id =0;
        this.observacion = "";
        this.numero_documento = "";
        this.url_archivo = "";
        this.id_empleado = "";
        this.id_ciudadano = "";
        this.id_documento = "";
        this.fecha_registro = today.toISOString().split('T')[0];
        this.fecha_edicion = today.toISOString().split('T')[0];
        this.fecha_documento = "";
        this.es_anulado = false;
        this.fecha_anulacion = today.toISOString().split('T')[0];
        this.motivo = "";
    }
}
export default Registro_DocumentoModel


