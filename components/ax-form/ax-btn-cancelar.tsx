import { EnumTipoEdicion, EnumEstadoEdicion } from 'lib/edicion'
export default function AxBtnModalCancelar({tipoEdicion,setEstadoEdicion, setTipoEdicion, setID }: any) {
    return  <button onClick={() => {
        tipoEdicion == EnumTipoEdicion.EDITAR ? setTipoEdicion(EnumTipoEdicion.VISUALIZAR) : setID("$NULL");
        setEstadoEdicion(EnumEstadoEdicion.CANCELADO);
    }} type="button"
        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
        Cancelar
    </button>
}

