class EmpleadoModel {
    id: string;
    nombres: string;
    apellidos: string;
    fecha_nacimiento: Date;
    numero_documento: string;
    sexo: string;
    direccion: string;
    celular: string;
    tipo_contrato: string;
    email: string;
    es_activo: boolean;
    url_imagen: string;
    id_area: string;
    id_rol: string;
    id_distrito: string;
    fecha_creacion?: string;
    fecha_edicion?: string;
    constructor() {
        this.id = "";
        this.nombres = "";
        this.apellidos = "";
        this.fecha_nacimiento = new Date();
        this.numero_documento = "";
        this.sexo = "MUJER";
        this.direccion = "";
        this.celular = "";
        this.tipo_contrato = "Contrato3Meses";
        this.email = "";
        this.es_activo = true;
        this.url_imagen = "";
        this.id_area = "";
        this.id_rol = "";
        this.id_distrito = "";
    }
}
export default EmpleadoModel


