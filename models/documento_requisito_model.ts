class Documento_RequisitoModel {
    id: number;
    id_documento: string;
    id_requisito: string;
    fecha_creacion?: string;
    fecha_edicion?: string;

    constructor(){
        this.id=0;
        this.id_documento="";
        this.id_requisito="";
    }
}
export default Documento_RequisitoModel


