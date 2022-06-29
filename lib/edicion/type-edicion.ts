import { EnumLuegoEdicion } from "./enum-luego-edicion";

type TypeSetID = (ID: string) => any;
type TypeSetLuegoEdicion = (luegoEdicion: EnumLuegoEdicion) => any;
type TypeFormularioProps = {
    ID: string
    setID: TypeSetID,
    setLuegoEdicion: TypeSetLuegoEdicion
}

export type {TypeFormularioProps};