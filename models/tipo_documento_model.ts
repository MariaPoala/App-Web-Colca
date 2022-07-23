class TipoDocumentoModel {
    id: number;
    fecha_creacion?: string;
    fecha_edicion?: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    tiempo_entrega?: number;
    costo: number;
    id_grupo: number;

    constructor() {
        this.id = 0;
        this.nombre = "";
        this.codigo = "";
        this.descripcion = "";
        this.tiempo_entrega = 0;
        this.costo = 0;
        this.id_grupo = 0;
    }
}
export default TipoDocumentoModel


