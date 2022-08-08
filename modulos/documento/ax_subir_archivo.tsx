import { useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { default as dayjs } from 'dayjs';
import * as uuid from 'uuid'
import { AxInput, AxSelect, AxSubmit, AxCheck, AxBtnModalCancelar, AxRadio } from 'components/form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import SolicitudModel from 'models/solicitud_model'
import DocumentoModel from "models/documento_model";
import supabase from "lib/supabase_config";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
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

    const [clic, setclic] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [urlArchivo, setUrlArchivo] = useState("")
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
    async function FndescargarImg() {
        try {

            if (formData.url_archivo_solicitud) {

                const { signedURL, error } = await supabase.storage.from('archivo-solicitud').createSignedUrl(formData.url_archivo_solicitud, 60)
                if (error) {
                    throw error
                }
                if (signedURL) {
                    setUrlArchivo(signedURL)
                }
            }
        } catch (error: any) {
            console.log('Error downloading image: ', error.message)
        }
    }

    async function subirArchivo(event: any) {
        try {
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }
            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage.from('archivo-solicitud').upload(filePath, file)
            if (uploadError) {
                console.log(uploadError)
                throw uploadError
            }
            console.log(fileName);
            setFormData({ name: 'url_archivo_solicitud', value: fileName })
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
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
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Archivo</h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-8">
                                           
                                        <div className="md:col-span-5">
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Adjuntar formato 
                                                    </label>

                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
                                                            <div className="space-y-1 text-center">
                                                                <div>
                                                                    <div style={{ width: 100 }}>
                                                                        {formData.url_archivo_solicitud ?                                                                           
                                                                            <label className="button primary block" htmlFor="single">
                                                                                {uploading ? 'Actualizando archivo ...' : 'Actualizar Archivo'}
                                                                            </label>:
                                                                             <label className="button primary block" htmlFor="single">
                                                                             {uploading ? 'Subiendo archivo ...' : 'Subir Archivo'}
                                                                         </label> 
                                                                        }
                                                                        <p className="text-xs text-gray-500">Jpg, Png, Img</p>
                                                                        <input
                                                                            style={{
                                                                                visibility: 'hidden',
                                                                                position: 'absolute',
                                                                            }}
                                                                            type="file"
                                                                            id="single"
                                                                            accept="image/*"
                                                                            onChange={subirArchivo}
                                                                            disabled={uploading}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-1">
                                                <div className=" sm:border-t sm:border-gray-200 sm:pt-5">
                                                    {formData.url_archivo_solicitud ?
                                                        clic == false ?
                                                            <button type="button"
                                                                className="ml-3 inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500     disabled:bg-green-300"
                                                                onClick={() => {
                                                                    FndescargarImg()
                                                                    setclic(true)
                                                                }}
                                                            >
                                                                <EyeIcon className="h-8 w-8 text-white "> </EyeIcon>
                                                                Visualizar Archivo
                                                            </button>
                                                            :
                                                            <button type="button"
                                                                className="ml-3 inline-flex items-center px-3 py-2 border border-blue-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300     disabled:bg-blue-300"
                                                                onClick={() => {
                                                                    FndescargarImg()
                                                                    setclic(false)
                                                                }}
                                                            >
                                                                <EyeOffIcon className="h-8 w-8 text-white "></EyeOffIcon>
                                                                Ocultar Archivo
                                                            </button>
                                                        :
                                                        <p className="text-red-500 border-4 border-red-400 text-center">Sin Archivo</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-6">
                                                {clic == true &&
                                                    <div className="bg-white">
                                                        {urlArchivo ? (
                                                            <div className="">
                                                                <ul role="list" className="content-start sm:grid sm:grid-cols-1 sm:gap-x-1 sm:gap-y-1 sm:space-y-0 lg:grid-cols-1 lg:gap-x-1">
                                                                    <li key={urlArchivo}>
                                                                        <img className="lg:ml-20 md:ml:2 object-cover shadow-lg rounded-lg" src={urlArchivo} alt="" />
                                                                    </li>
                                                                </ul>
                                                            </div>)
                                                            :
                                                            (
                                                                <div className="archivo-requisito no-image" style={{ height: 100, width: 100 }} />
                                                            )}

                                                    </div>
                                                }
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
