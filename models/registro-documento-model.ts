class Registro_DocumentoModel {
    ID: string;
    NroDocumento: string;
    Observacion: string;
    URLArchivo: string;
    IDEmpleado: string;
    IDCiudadano: string;
    IDDocumento: string;
    FecRegistro: string;
    FecEdicion: string;
    FecDocumento: string;
    EsAnulado: boolean;
    FecAnulacion: string;
    Motivo: string;

    constructor() {
        this.ID = "";
        this.Observacion = "";
        this.NroDocumento = "";
        this.URLArchivo = "";
        this.IDEmpleado = "";
        this.IDCiudadano = "";
        this.IDDocumento = "";
        this.FecRegistro = "";
        this.FecEdicion = "";
        this.FecDocumento = "";
        this.EsAnulado = false;
        this.FecAnulacion = "";
        this.Motivo = "";
    }
}
export default Registro_DocumentoModel


