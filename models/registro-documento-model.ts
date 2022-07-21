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
        let today = new Date()
        this.ID = "";
        this.Observacion = "";
        this.NroDocumento = "";
        this.URLArchivo = "";
        this.IDEmpleado = "";
        this.IDCiudadano = "";
        this.IDDocumento = "";
        this.FecRegistro = today.toISOString().split('T')[0];
        this.FecEdicion = today.toISOString().split('T')[0];
        this.FecDocumento = "";
        this.EsAnulado = false;
        this.FecAnulacion = today.toISOString().split('T')[0];
        this.Motivo = "";
    }
}
export default Registro_DocumentoModel


