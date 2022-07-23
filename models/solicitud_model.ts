class SolicitudModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    asunto: string;
    numero_documento: string;
    fecha_inicio: string;
    fecha_plazo: string;
    motivo: string;
    tipo_entidad: string;
    id_tipo_documento: number;
    id_documento: number;
    id_area: number;
    id_empleado: number;
    id_persona: number;
    id_empresa?: number;

    constructor() {
        this.id = 0;
        this.asunto = "";
        this.numero_documento = "";
        this.fecha_inicio = "";
        this.fecha_plazo = "";
        this.motivo = "";
        this.tipo_entidad = "PERSONA";
        this.id_tipo_documento = 0;
        this.id_documento = 0;
        this.id_area = 0;
        this.id_empleado = 0;
        this.id_persona = 0;
    }
}
export default SolicitudModel


