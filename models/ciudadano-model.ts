class CiudadanoModel {
    ID: string;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: Date;
    NroDocumento: string;
    Direccion: string;
    Celular: string;
    Email: string;
    TipoPersona: string;
    IDDistrito: string;

    constructor(){
        this.ID="";
        this.Nombres="";
        this.Apellidos="";
        this.FechaNacimiento= new Date();
        this.NroDocumento="";
        this.Direccion="";
        this.Celular="";
        this.Email="";
        this.TipoPersona="";
        this.IDDistrito="";
    }
}
export default CiudadanoModel


