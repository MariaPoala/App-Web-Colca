class SolicitudModel {
    ID: string;
    Asunto: string;
    NroDocumento: string;
    FechaInicio: Date;
    FechaPlazo: Date;
    Motivo: string;
    IDEmpleado: string;
    IDCiudadano: string;
    IDArea: string;
    IDDocumento: string;

    constructor(){
        this.ID="";
        this.Asunto="";
        this.NroDocumento="";
        this.FechaInicio=new Date();
        this.FechaPlazo=new Date();
        this.Motivo="";
        this.IDEmpleado="";
        this.IDCiudadano="";
        this.IDArea="";
        this.IDDocumento="";
    }
}
export default SolicitudModel


