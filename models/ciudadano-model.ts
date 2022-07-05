class CiudadanoModel {
    ID: string;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: Date;
    NroDocumento: string;
    Direccion: string;
    Celular: string;
    Email: string;
    TipoPersona: string;
    IDDistrito: string;

    constructor(){
        this.ID="";
        this.Nombre="";
        this.Apellido="";
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


