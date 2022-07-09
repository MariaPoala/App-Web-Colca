import { EnumEstadoEdicion } from "./enum-estado-edicion";

type TypeSetID = (ID: string) => any;
type TypeSetEstadoEdicion = (luegoEdicion: EnumEstadoEdicion) => any;
type TypeFormularioProps = {
    ID: string
    setID: TypeSetID,
    setEstadoEdicion: TypeSetEstadoEdicion

}

export type {TypeFormularioProps};