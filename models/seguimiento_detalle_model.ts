class SolicitudModel {
    id: number;
    estado: string;
    observaciones: string;
    fecha_registro: Date;
    fecha: Date;
    id_empleado: number;
    id_solicitud: number;
    id_area: number;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor(){
        this.id=0;
        this.estado="";   
        this.observaciones="";      
        this.fecha_registro=new Date();
        this.fecha=new Date();
        this.id_empleado=0;
        this.id_solicitud=0;
        this.id_area=0;
    }
}
export default SolicitudModel


