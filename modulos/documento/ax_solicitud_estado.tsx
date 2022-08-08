import { useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { default as dayjs } from 'dayjs';
import * as uuid from 'uuid'
import { AxInput, AxSelect, AxSubmit, AxCheck, AxBtnModalCancelar, AxRadio } from 'components/form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import SolicitudModel from 'models/solicitud_model'
import DocumentoModel from "models/documento_model";
// import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
// import db from "lib/firebase-config";
// db.app
export const getServerSideProps = withPageAuthRequired();
const fetcherEmpleado = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
const fetcherPersona = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
const fetcherEmpresa = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
const fetcherTipoDocumento = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
const fetcherArea = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
const fetcherDocumento = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const formReducer = (state: SolicitudModel, event: any): SolicitudModel => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return new SolicitudModel()
    }
    return { ...state, [event.name]: event.value }
}

export default function AxSolicitudEstado({ ID, setID, setEstadoEdicion, tipoEdicion, setOpen }: any) {
    const { user, error, isLoading: isLoadingUser } = useUser();
    const { data: listaEmpleado } = useSWRImmutable<any[]>('/api/entidad/empleado/v_empleado', fetcherEmpleado);
    const { data: listaPersona } = useSWRImmutable<any[]>('/api/entidad/persona/v_persona', fetcherPersona);
    const { data: listaEmpresa } = useSWRImmutable('/api/entidad/empresa', fetcherEmpresa);
    const { data: listaArea } = useSWRImmutable('/api/administracion/area', fetcherArea);
    const { data: listaDocumento } = useSWRImmutable<DocumentoModel[]>('/api/documento/documento', fetcherDocumento);
    const [listaDocumentoFiltrado, setListaDocumentoFiltrado] = useState<DocumentoModel[]>([])
    const { data: listaTipoDocumento } = useSWRImmutable<any[]>('/api/documento/tipo_documento', fetcherTipoDocumento);
    const [formData, setFormData] = useReducer(formReducer, new SolicitudModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imagenupload, setImagen] = useState(null);
    // const storage = getStorage();
    const [listaimage, setListaimage] = useState<Array<any>>([]);
    useEffect(() => {
        setIsLoading(true)
        if (ID == 0) {
            setFormData({ FORM_ADD: true })
            const empleado = listaEmpleado?.filter(x => x.email == user?.email);
            if (empleado && empleado[0]) {
                setFormData({ name: "id_empleado", value: empleado[0].id })
                setFormData({ name: "id_area", value: empleado[0].id_area, })
            }
        }
        else {
            const fetchData = async () => {
                const response = await fetch(`/api/documento/solicitud/${ID}`);
                const data: SolicitudModel = await response.json();
                data.fecha_creacion = dayjs(data.fecha_creacion).format("YYYY-MM-DD")
                data.fecha_inicio = dayjs(data.fecha_inicio).format("YYYY-MM-DD")
                data.fecha_plazo = dayjs(data.fecha_plazo).format("YYYY-MM-DD")
                data.fecha_edicion = dayjs().format("YYYY-MM-DD")
                setFormData({ FORM_DATA: data });
            }
            fetchData().catch(console.error);
        }
        setIsLoading(false)
    }, [ID])

    useEffect(() => {
        if (ID > 0) {
            const filtrado = listaDocumento?.filter(x => x.id_persona == formData.id_persona && x.id_tipo_documento == formData.id_tipo_documento);
            if (filtrado) setListaDocumentoFiltrado(filtrado);
        }
    }, [listaDocumento, formData.id_persona])

    const changeImagen = (e: any) => {
        setImagen(e.target.files[0]);

    }
    const uploadimage = () => {
        // if (imagenupload == null) return;
        // const imageRef = ref(storage, `archivodocumento/${setImagen.name + uuid.v4()}`)
        // uploadBytes(imageRef, imagenupload).then((snapshot) => {
        //     alert('Uploaded a blob or file!');
        //     getDownloadURL(snapshot.ref).then((url) => {
        //         setListaimage((prev) => [...prev, url]);
        //         console.log(url)
        //         formData.url_archivo = (url)
        //     })
        // });
        // return;
    }

    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        if (event.target.name == "id_tipo_documento") {
            const item = listaTipoDocumento?.filter(x => x.id == event.target.value);
            if (item && item[0]) {
                const fechaFinal = dayjs().add(item[0].tiempo_entrega, 'days').format("YYYY-MM-DD")
                setFormData({ name: "fecha_plazo", value: fechaFinal })
                setFormData({ name: "i_total", value: item[0].costo })
            }
        }
        else if (event.target.name == "id_persona") {
            const filtrado = listaDocumento?.filter(x => x.id_persona == event.target.value && x.id_tipo_documento == formData.id_tipo_documento);
            if (filtrado) setListaDocumentoFiltrado(filtrado);
        }
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        const dataEnvio = JSON.stringify(formData);
        const response = await fetch('/api/documento/solicitud', {
            body: dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })
        const result: SolicitudModel = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setID(result.id);
        setIsSubmitting(false);
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) setID(-1);
        setEstadoEdicion(EnumEstadoEdicion.GUARDADO);
    }
    return (
        <>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl "}>
                <div className="divide-y divide-gray-200">
                    {/*PORTADA*/}
                    <div className="h-1 mt-1 bg-indigo-700 rounded-sm" />
                    {/*FORMULARIO*/}
                    <div className="px-0 py-0 m-2 ">
                        <div className="p-4 md:p-2">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <fieldset disabled={tipoEdicion == EnumTipoEdicion.VISUALIZAR} className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información De Estado</h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-8">
                                           
                                            <div className="md:col-span-2"></div>
                                            <div className="md:col-span-4">
                                                <AxSelect name="estado" value={formData.estado} label="Estado" handleChange={handleChange}>
                                                    <option key="Validado" value="Validado">Validado</option>
                                                    <option key="Entregado" value="Entregado">Entregado</option>
                                                </AxSelect>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </fieldset>

                                {tipoEdicion != EnumTipoEdicion.VISUALIZAR && <div className="pt-5">
                                    <div className="flex justify-end">
                                        <AxBtnModalCancelar setEstadoEdicion={setEstadoEdicion} />
                                        <AxSubmit loading={isSubmitting} />
                                    </div>
                                </div>
                                }
                            </form >
                        </div >
                    </div>
                </div>
            </div >
        </>
    )
}
