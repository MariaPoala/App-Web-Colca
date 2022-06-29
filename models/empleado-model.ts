class EmpleadoModel {
    ID: string;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: Date;
    NroDocumento: string;
    Sexo: string;
    Direccion: string;
    Celular: string;
    TipoContrato: string;
    Email: string;
    EsActivo: boolean;
    URLImgPerfil: string;
    IDArea: string;
    IDRol: string;
    IDDistrito: string;
    constructor() {
        this.ID = "";
        this.Nombres = "";
        this.Apellidos = "";
        this.FechaNacimiento = new Date();
        this.NroDocumento = "";
        this.Sexo = "MUJER";
        this.Direccion = "";
        this.Celular = "";
        this.TipoContrato = "Contrato3Meses";
        this.Email = "";
        this.EsActivo = true;
        this.URLImgPerfil = "";
        this.IDArea = "";
        this.IDRol = "";
        this.IDDistrito = "";
    }
}

export default EmpleadoModel


