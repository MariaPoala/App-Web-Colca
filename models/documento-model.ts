class DocumentoModel {
    ID: string;
    Nombre: string;
    Codigo: string;
    Descripcion: string;
    NroDocumento: string;
    TiempoEntrega: number;
    Costo: number;
    IDGrupo: string;
    IDTipoDocumento: string;
    IDsConsideracion: string[];
    IDsRequisito: string[];

    constructor() {
        this.ID = "";
        this.Nombre = "";
        this.Codigo = "";
        this.Descripcion = "";
        this.NroDocumento = "";
        this.TiempoEntrega = 0;
        this.Costo = 0;
        this.IDGrupo ="";
        this.IDTipoDocumento = "";
        this.IDsConsideracion = [];
        this.IDsRequisito = [];
    }
}
export default DocumentoModel


