import { EnumEstadoEdicion } from "./enum-estado-edicion";
import { EnumTipoEdicion } from "./enum-tipo-edicion";
type TypeSetID = (ID: string) => any;
type TypeSetEstadoEdicion = (luegoEdicion: EnumEstadoEdicion) => any;
type TypeSetTipoEdicion = (tipoEdicion: EnumTipoEdicion) => any;

type TypeFormularioProps = {
    ID: string
    setID: TypeSetID,
    setEstadoEdicion: TypeSetEstadoEdicion,
    tipoEdicion?: EnumTipoEdicion
}

type TypeBtnCancelarProps = {
    setID: TypeSetID,
    setEstadoEdicion: TypeSetEstadoEdicion,
    tipoEdicion: EnumTipoEdicion,
    setTipoEdicion: TypeSetTipoEdicion
}

export type { TypeBtnCancelarProps, TypeFormularioProps };