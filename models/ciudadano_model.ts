class CiudadanoModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Date;
    nro_documento: string;
    direccion: string;
    celular: string;
    email: string;
    tipo_persona: string;
    id_distrito: string;

    constructor(){
        this.id=0;
        this.nombres="";
        this.apellidos="";
        this.fecha_nacimiento= new Date();
        this.nro_documento="";
        this.direccion="";
        this.celular="";
        this.email="";
        this.tipo_persona="";
        this.id_distrito="";
    }
}
export default CiudadanoModel


