class Registro_DocumentoModel {
    ID: string;   
    NroDocumento: string;
    Observacion: string;
    URLArchivo: string;
    IDEmpleado: string;
    IDCiudadano: string;
    IDDocumento: string;
    FecRegistro: Date;
    FecEdicion: Date;
    FecDocumento: Date;
    FecAnulacion: Date;
    Motivo: string;

    constructor(){
        this.ID="";
        this.Observacion="";
        this.NroDocumento="";
        this.URLArchivo="";
        this.IDEmpleado="";
        this.IDCiudadano="";
        this.IDDocumento="";
        this.FecRegistro= new Date();
        this.FecEdicion=new Date(Date.now());
        this.FecDocumento=new Date();
        this.FecAnulacion=new Date();
        this.Motivo="";
    }
}
export default Registro_DocumentoModel


