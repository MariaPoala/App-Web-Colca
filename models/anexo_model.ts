class AnexoModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    nombre: string;
    descripcion: string;
    id_distrito:number

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.descripcion = "";
        this. id_distrito=0;
    }
}
export default AnexoModel


