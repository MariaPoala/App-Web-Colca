class SolicitudModel {
    id: number;
    asunto: string;
    numero_documento: string;
    fecha_inicio: Date;
    fecha_plazo: Date;
    motivo: string;
    id_empleado: string;
    id_ciudadano: string;
    id_area: string;
    id_documento: string;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor(){
        this.id=0;
        this.asunto="";
        this.numero_documento="";
        this.fecha_inicio=new Date();
        this.fecha_plazo=new Date();
        this.motivo="";
        this.id_empleado="";
        this.id_ciudadano="";
        this.id_area="";
        this.id_documento="";
    }
}
export default SolicitudModel


