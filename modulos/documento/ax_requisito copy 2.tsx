import { useEffect, useReducer, useState, Fragment } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Dialog, Transition } from "@headlessui/react";
import { AxInput, AxModalEliminar, AxSubmit, AxBtnEliminar, AxBtnEditar, AxBtnCancelar } from 'components/form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import { ChevronLeftIcon } from "@heroicons/react/outline"

import * as uuid from 'uuid'
// import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import RequisitoModel from 'models/requisito_model'
// import db from "lib/firebase-config";
// db.app
export const getServerSideProps = withPageAuthRequired();
import supabase from "lib/supabase_config";
import { async } from "@firebase/util";


const formReducer = (state: RequisitoModel, event: any): RequisitoModel => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return new RequisitoModel()
    }
    return { ...state, [event.name]: event.value }
}

export default function AxGrupo({ ID, setID, setEstadoEdicion }: TypeFormularioProps) {
    const [formData, setFormData] = useReducer(formReducer, new RequisitoModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
    const [open, setOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [urlArchivo, setUrlArchivo] = useState("")

    useEffect(() => {
        setIsLoading(true)
        setTipoEdicion(ID == 0 ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (ID == 0) {
            setFormData({ FORM_ADD: true })
        }
        else {
            const fetchData = async () => {
                const response = await fetch(`/api/documento/requisito/${ID}`);
                const data: RequisitoModel = await response.json();
                setFormData({ FORM_DATA: data });
            }
            fetchData().catch(console.error);
        }
        setIsLoading(false)
    }, [ID])

    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        const dataEnvio = JSON.stringify(formData);
        const response = await fetch('/api/documento/requisito', {
            body: dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })

        const result: RequisitoModel = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setID(result.id);
        setIsSubmitting(false);
        setOpen(false);
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) setID(-1);
        setTipoEdicion(EnumTipoEdicion.VISUALIZAR)
        setEstadoEdicion(EnumEstadoEdicion.GUARDADO);
    }

    //subir archivo
    const [imagenupload, setImagen] = useState(null);
    // const storage = getStorage();
    const [listaimage, setListaimage] = useState<Array<any>>([]);
    const [imgurl, setImgurl] = useState("")
    //OBTENIENDO LA IMAGEN
    const changeImagen = (e: any) => {
        setImagen(e.target.files[0]);
        // const { data, error } = await supabase.storage
        // .from('archivos')
        // .upload('public/'+ setImagen.name, setImagen)
        return;
    }

    useEffect(() => {
        const descargarImg = async () => {
            try {

                if (formData.url_imagen) {
                    // const { data, error } = await supabase.storage.from('archivo-requisito').download(formData.url_imagen)
                    // if (error) {
                    //     throw error
                    // }
                    // if (data) {
                    //     const url = URL.createObjectURL(data)
                    //     console.log(url);
                    //     setUrlArchivo(url)
                    // }
                    console.time()
                    const { signedURL, error } = await supabase.storage.from('archivo-requisito').createSignedUrl(formData.url_imagen, 60)
                    if (error) {
                        throw error
                    }
                    if (signedURL) {
                        // const url = URL.createObjectURL(data)
                        console.log(signedURL);
                        setUrlArchivo(signedURL)
                        console.time()
                    }
                }
            } catch (error: any) {
                console.log('Error downloading image: ', error.message)
            }
        }
        descargarImg().catch(console.error);
    }, [formData.url_imagen])

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

            let { error: uploadError } = await supabase.storage.from('archivo-requisito').upload(filePath, file)
            if (uploadError) {
                console.log(uploadError)
                throw uploadError
            }
            console.log(fileName);
            setFormData({ name: 'url_imagen', value: fileName })
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <nav className="flex items-start pb-1 sm:hidden" aria-label="Breadcrumb">
                <button
                    onClick={() => { setEstadoEdicion(EnumEstadoEdicion.CANCELADO); }}
                    className="hover:bg-indigo-200 rounded-sm p-2 inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                    <ChevronLeftIcon className="-ml-2 h-5 w-5 text-indigo-700" aria-hidden="true" />
                    <span>Lista de Requisitos</span>
                </button>
            </nav>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl"}>
                <div className="divide-y divide-gray-200">
                    {/*PORTADA*/}
                    <div className="pb-6">
                        <div className="h-12 bg-indigo-700 rounded-md">
                        </div>
                        <div className="-mt-8 flex items-end px-6">
                            {/*CABECERA*/}
                            <div className="ml-6 flex-1">
                                <div className="-mt-2">
                                    <h3 className="font-bold text-white text-2xl">{formData.nombre ? formData.nombre : "..."}  </h3>
                                </div>
                                {/*AREA DE EDICIÓN*/}
                                <div className="w-0 flex-1 pt-2">
                                    <div className="mt-2 flex">
                                        <AxBtnEditar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion} />
                                        <AxBtnEliminar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion} setOpen={setOpen} />
                                    </div>
                                    <Transition.Root show={open} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={setOpen}>
                                            <AxModalEliminar setOpen={setOpen} setTipoEdicion={setTipoEdicion} formData={formData.nombre} isSubmitting={isSubmitting} handleSubmit={handleSubmit} nombreModal="Grupo" />
                                        </Dialog>
                                    </Transition.Root>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*FORMULARIO*/}
                    <div className="px-0 py-0">
                        <div className="p-4 md:p-6">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <fieldset disabled={tipoEdicion == EnumTipoEdicion.VISUALIZAR} className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Datos </h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-6">
                                            <div className="md:col-span-2">
                                                <AxInput name="nombre" label="Nombre" value={formData.nombre} handleChange={handleChange} />
                                            </div>
                                            <div className="hidden md:flex md:col-span-4" />
                                            <div className="md:col-span-3">
                                                <AxInput name="descripcion" label="Descripcion" value={formData.descripcion} handleChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Adjuntar formato de Ejemplo
                                    </label>

                                    <div>
                                        {urlArchivo ? (
                                            <img
                                                src={urlArchivo}
                                                alt="archivo-requisito"
                                                className="archivo-requisito image"
                                                style={{ height: 100, width: 100 }}
                                            />
                                        ) : (
                                            <div className="archivo-requisito no-image" style={{ height: 10, width: 10 }} />
                                        )}
                                        <div style={{ width: 10 }}>
                                            <label className="button primary block" htmlFor="single">
                                                {uploading ? 'Uploading ...' : 'Upload'}
                                            </label>
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
                                <div className="bg-white">
                                    <div className="">
                                        <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                                            <li key={formData.id}>
                                                <div className="space-y-4">
                                                    {/* <img className="object-cover shadow-lg rounded-lg" src={formData.url_imagen} alt="" /> */}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {
                                    tipoEdicion != EnumTipoEdicion.VISUALIZAR &&
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <AxBtnCancelar tipoEdicion={tipoEdicion} setEstadoEdicion={setEstadoEdicion} setTipoEdicion={setTipoEdicion} setID={setID} />
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


