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

export default function AxDocumento({ ID, setID, setEstadoEdicion, tipoEdicion, setOpen }: any) {
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
    const [urlArchivo, setUrlArchivo] = useState("")
    const [archivo, setArchivo] = useState("")
    // const storage = getStorage();
    const [listaimage, setListaimage] = useState<Array<any>>([]);
    useEffect(() => {
        setIsLoading(true)
        if (ID == 0) {
            setFormData({ FORM_ADD: true })
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
        if (ID == 0) {
            const empleado = listaEmpleado?.filter(x => x.email == user?.email);
            if (empleado && empleado[0]) {
                setFormData({ name: "id_empleado", value: empleado[0].id })
                setFormData({ name: "id_area", value: empleado[0].id_area, })
            }
        }
    }, [listaEmpleado])

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

    async function FndescargarImg() {
        try {

            if (archivo) {

                const { signedURL, error } = await supabase.storage.from('archivo-documento').createSignedUrl(archivo, 60)
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
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información</h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-8">
                                            <div className="md:col-span-2">
                                                <AxSelect name="id_tipo_documento" value={formData.id_tipo_documento} label="Tipo Documento" handleChange={handleChange}>
                                                    {listaTipoDocumento && listaTipoDocumento.map((tipoDoc: any) => <option key={tipoDoc.id} value={tipoDoc.id}>{tipoDoc.nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxInput name="numero_documento" label="NroDocumento" value={formData.numero_documento} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxInput name="fecha_inicio" label="Fecha Inicio" value={formData.fecha_inicio} handleChange={handleChange} disabled={true} type="date" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxInput name="fecha_plazo" label="Fecha Plazo" value={formData.fecha_plazo} handleChange={handleChange} disabled={true} type="date" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxSelect name="tipo_entidad" value={formData.tipo_entidad} label="Tipo Entidad" handleChange={handleChange}>
                                                    <option key="Natural" value="Natural">Natural</option>
                                                    <option key="Juridico" value="Juridico">Juridico</option>
                                                </AxSelect>
                                            </div>
                                            {
                                                formData.tipo_entidad == "Natural"
                                                    ? <div className="md:col-span-3">
                                                        <AxSelect name="id_persona" value={formData.id_persona} label="Persona" handleChange={handleChange}>
                                                            {listaPersona && listaPersona.map((persona: any) => <option key={persona.id} value={persona.id}>{persona.nombre_apellido}</option>)}
                                                        </AxSelect>
                                                    </div>
                                                    : <div className="md:col-span-3">
                                                        <AxSelect name="id_empresa" value={formData.id_empresa} label="Empresa" handleChange={handleChange}>
                                                            {listaEmpresa && listaEmpresa.map((empresa: any) => <option key={empresa.id} value={empresa.id}>{empresa.razon_social}</option>)}
                                                        </AxSelect>
                                                    </div>
                                            }

                                            <div className="md:col-span-3">
                                                <AxSelect name="id_documento" value={formData.id_documento} label="Documento" handleChange={handleChange}>
                                                    {listaDocumentoFiltrado && listaDocumentoFiltrado.map((item: any) => <option key={item.id} value={item.id}>{item.numero_documento}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-6">
                                                <AxInput name="motivo" label="Motivo" value={formData.motivo} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxInput name="i_total" label="Total a Pagar" value={formData.i_total} handleChange={handleChange} disabled={true} />
                                            </div>

                                            <div className="md:col-span-2">
                                                <AxSelect name="id_empleado" value={formData.id_empleado} label="Empleado" handleChange={handleChange} disabled={true}>
                                                    {listaEmpleado && listaEmpleado.map((item: any) => <option key={item.id} value={item.id}>{item.nombre_apellido}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxSelect name="id_area" value={formData.id_area} label="Area" handleChange={handleChange} disabled={true}>
                                                    {listaArea && listaArea.map((area: any) => <option key={area.id} value={area.id}>{area.nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            {/* <div className="md:col-span-2">
                                                <AxSelect name="id_documento" value={formData.id_documento} label="Documento" handleChange={handleChange}>
                                                    {listaDocumento && listaDocumento.map((doc: any) => <option key={doc.id} value={doc.id}>{doc.numero_documento}</option>)}
                                                </AxSelect>
                                            </div> */}
                                            <div className="md:col-span-2">
                                                <AxInput name="fecha_creacion" label="Fecha Registro" value={formData.fecha_creacion} handleChange={handleChange} disabled type="date" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <AxSelect name="estado" value={formData.estado} label="Estado" handleChange={handleChange}>
                                                    <option key="Registrado" value="Registrado">Registrado</option>
                                                    <option key="Validado" value="Validado">Validado</option>
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-8">
                                                <AxInput name="asunto" label="Observaciones" value={formData.asunto} handleChange={handleChange} />
                                            </div>
                                            {/* <div className="md:col-span-2">
                                                <AxInput name="fecha_edicion" label="Fecha Edición" value={formData.fecha_edicion} handleChange={handleChange} disabled type="date" />
                                            </div> */}
                                        </div>
                                        
                                    </div>
                                    {/* <fieldset>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Adjuntar formato de Ejemplo
                                            </label>

                                            <div className="sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <img className="mx-auto h-12 w-12 text-gray-400" src="/upload-file.svg" alt="Easywire logo" />
                                                        <div className="flex   text-sm text-center text-gray-600">
                                                            <label
                                                                htmlFor="url_archivo"
                                                                className="relative ml-7 cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <input className="bg-indigo-200" type="file" name="image" onChange={changeImagen} />
                                                            </label>
                                                        </div>
                                                        <p className="text-xs text-gray-500">Word, Pdf, Img hasta 10MB</p>
                                                        <button type="button" className="bg-indigo-300 border-2 rounded-md text-white" onClick={uploadimage} > GUARDAR IMAGEN </button>
                                                        <div className="visibility: hidden">
                                                            <AxInput name="url_archivo" label="Archivo" value={formData.url_archivo ? formData.url_archivo : ""} handleChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset> */}
                                    {/* <fieldset disabled={tipoEdicion == EnumTipoEdicion.AGREGAR}>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-6">
                                            <div className="md:col-span-6">
                                                <label className="mt-2">Anulación de documento </label>
                                            </div>
                                            <div className="md:col-span-1" />
                                            <div className="md:col-span-1">
                                                <AxCheck id="es_anulado" name="EsAnulado" value={formData.es_anulado} label="¿Es anulado?" handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-1">
                                                <AxInput name="fecha_anulacion" label="Fecha Anulación" value={formData.fecha_anulacion} handleChange={handleChange} type="date" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="motivo_anulacion" label="Motivo" value={formData.motivo_anulacion} handleChange={handleChange} type="text" />
                                            </div>
                                        </div>
                                    </fieldset> */}
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
