import { Fragment, useEffect, useReducer, useState, useRef } from "react";
import useSWRImmutable from "swr/immutable"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Dialog, Transition } from "@headlessui/react";
import * as uuid from 'uuid'
import { AxBtnCancelar, AxBtnEditar, AxInput, AxBtnEliminar, AxSelect, AxSubmit, AxModalEliminar, AxSelectMultiple } from 'components/form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import RegistroDocumentoModel from 'models/registro_documento_model'
import { ChevronLeftIcon, XIcon } from "@heroicons/react/outline";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
// import db from "lib/firebase-config";
// db.app

export const getServerSideProps = withPageAuthRequired();
const fetcherEmpleado = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const fetcherCiudadano = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const fetcherDocumento = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());



const formReducer = (state: RegistroDocumentoModel, event: any): RegistroDocumentoModel => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return new RegistroDocumentoModel()
    }
    return { ...state, [event.name]: event.value }
}

export default function AxRegistroDocumento({ ID, setID, setEstadoEdicion }: TypeFormularioProps) {
    const { data: listaEmpleado } = useSWRImmutable('/api/empleado/edicion', fetcherEmpleado);
    const { data: listaCiudadano } = useSWRImmutable('/api/ciudadano/edicion', fetcherCiudadano);
    const { data: listaDocumento } = useSWRImmutable('/api/documento/edicion', fetcherDocumento);
    const [formData, setFormData] = useReducer(formReducer, new RegistroDocumentoModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
    const [open, setOpen] = useState(false)
    const [imagenupload, setImagen] = useState(null);
    const storage = getStorage();
    const [listaimage, setListaimage] = useState<Array<any>>([]);


    useEffect(() => {
        setIsLoading(true)

        setTipoEdicion(ID == 0 ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (ID == 0) {
            setFormData({ FORM_ADD: true })
        }
        else {
            const fetchData = async () => {
                const response = await fetch(`/api/registro-documento/${ID}`);
                const data: RegistroDocumentoModel = await response.json();
                setFormData({ FORM_DATA: data });
            }
            fetchData().catch(console.error);
        }
        setIsLoading(false)
    }, [ID])
    const changeImagen = (e: any) => {
        setImagen(e.target.files[0]);

    }
    const uploadimage = () => {
        if (imagenupload == null) return;
        const imageRef = ref(storage, `archivodocumento/${setImagen.name + uuid.v4()}`)
        uploadBytes(imageRef, imagenupload).then((snapshot) => {
            alert('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((url) => {
                setListaimage((prev) => [...prev, url]);
                console.log(url)
                formData.url_archivo = (url)
            })
        });
        return;
    }
    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        // if (event.target.name == "IDsConsideracion") {
        //     const indexAnterior = formData.IDsConsideracion.indexOf(event.target.value);
        //     if (indexAnterior != -1) formData.IDsConsideracion.splice(indexAnterior, 1);
        //     else formData.IDsConsideracion.push(event.target.value);
        //     setFormData({
        //         name: event.target.name,
        //         value: [...formData.IDsConsideracion]
        //     })
        // }
        // else if (event.target.name == "IDsRequisito") {
        //     const indexAnterior = formData.IDsRequisito.indexOf(event.target.value);
        //     if (indexAnterior != -1) formData.IDsRequisito.splice(indexAnterior, 1);
        //     else formData.IDsRequisito.push(event.target.value);
        //     setFormData({
        //         name: event.target.name,
        //         value: [...formData.IDsRequisito]
        //     })
        // }
        // else if (event.target.name == "Nombre") {
        //     setFormData({
        //         name: "Nombre",
        //         value: event.target.value
        //     })
        //     setFormData({
        //         name: "Codigo",             
        //         value: formData.Nombre.substring(0,3) + "-" + fecha.getFullYear()
        //     })


        // }
        // else {
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        })
        // }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        const dataEnvio = JSON.stringify(formData);
        const response = await fetch('/api/registro-documento/edicion', {
            body: dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })
        const result: RegistroDocumentoModel = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setID(result.id);
        setIsSubmitting(false);
        setOpen(false);
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) setID(-1);
        setTipoEdicion(EnumTipoEdicion.VISUALIZAR)
        setEstadoEdicion(EnumEstadoEdicion.GUARDADO);
    }

    return (
        <>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl"}>
                <div className="divide-y divide-gray-200">
                    {/*PORTADA*/}

                    <div className="h-3 bg-indigo-700 rounded-sm" />
                    
                    <div className="w-0 flex-1 pt-2">
                        <div className="mt-2 flex">
                            <AxBtnEditar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion}  ></AxBtnEditar>
                            <AxBtnEliminar tipoEdicion={tipoEdicion} EnumTipoEdicion setTipoEdicion={setTipoEdicion} setOpen={setOpen} > </AxBtnEliminar>
                        </div>
                        <Transition.Root show={open} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                                <AxModalEliminar setOpen={setOpen} setTipoEdicion={setTipoEdicion} formData={formData.numero_documento} isSubmitting={isSubmitting} handleSubmit={handleSubmit} nombreModal={"Grupo"}> </AxModalEliminar>
                            </Dialog>
                        </Transition.Root>
                    </div>
                    {/*FORMULARIO*/}
                    <div className="px-0 py-0 m-2">
                        <div className="p-4 md:p-2">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <fieldset disabled={tipoEdicion == EnumTipoEdicion.VISUALIZAR} className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-6">
                                            {/* <div className="md:col-span-3">
                                                <AxInput name="Nombre" label="Nombre" value={formData.Nombre} handleChange={handleChange} />
                                            </div> */}
                                            <div className="md:col-span-3">
                                                <AxInput name="numero_documento" label="NroDocumento" value={formData.numero_documento} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="observacion" label="Observacion" value={formData.observacion} handleChange={handleChange} type="text" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="id_empleado" value={formData.id_empleado} label="Empleado" handleChange={handleChange}>
                                                    {listaEmpleado && listaEmpleado.map((empleado: any) => <option key={empleado.ID} value={"/empleado/" + empleado.ID}>{empleado.Nombres}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="id_ciudadano" value={formData.id_ciudadano} label="Ciudadano" handleChange={handleChange}>
                                                    {listaCiudadano && listaCiudadano.map((ciudadano: any) => <option key={ciudadano.ID} value={"/ciudadano/" + ciudadano.ID}>{ciudadano.Nombres}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="id_documento" value={formData.id_documento} label="Documento" handleChange={handleChange}>
                                                    {listaDocumento && listaDocumento.map((documento: any) => <option key={documento.ID} value={"/documento/" + documento.ID}>{documento.Nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="fecha_registro" label="Fecha Registro" value={formData.fecha_registro} handleChange={handleChange} type="date" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="fecha_edicion" label="Fecha Edición" value={formData.fecha_edicion} handleChange={handleChange} type="date" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="fecha_documento" label="Fecha Documento" value={formData.fecha_documento} handleChange={handleChange} type="date" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="fecha_anulacion" label="Fecha Anulación" value={formData.fecha_anulacion} handleChange={handleChange} type="date" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="motivo" label="Motivo" value={formData.motivo} handleChange={handleChange} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Adjuntar formato de Ejemplo
                                    </label>

                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <img className="mx-auto h-12 w-12 text-gray-400" src="/upload-file.svg" alt="Easywire logo" />
                                                <div className="flex   text-sm text-center text-gray-600">
                                                    <label
                                                        htmlFor="UrlImgEjemplo"
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
                                {tipoEdicion != EnumTipoEdicion.VISUALIZAR && <div className="pt-5">
                                    <div className="flex justify-end">
                                        <AxBtnCancelar tipoEdicion={tipoEdicion} setEstadoEdicion={setEstadoEdicion} setTipoEdicion={setTipoEdicion} setID={setID}></AxBtnCancelar>
                                        <AxSubmit loading={isSubmitting} />
                                    </div>
                                </div>
                                }
                            </form >
                        </div >
                    </div>
                </div>
            </div>

        </>
    )
}
