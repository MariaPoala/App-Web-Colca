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
    IDDocumentoConsideraciones: string;

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
        this.IDDocumentoConsideraciones = "";
    }
}
export default DocumentoModel


