import { Fragment, useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Dialog, Transition } from "@headlessui/react";
import { AxBtnCancelar, AxBtnEditar, AxInput, AxBtnEliminar, AxSelect, AxSubmit, AxModalEliminar, AxSelectMultiple } from 'components/ax-form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import DocumentoModel from 'models/documento-model'
import ConsideracionDocumentoModel from 'models/consideracion-documento-model'
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'

export const getServerSideProps = withPageAuthRequired();
const fetcherGrupo = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const fetcherTipoDocumento = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const fetcherArea = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const fetcherConsideracion = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const formReducer = (state: DocumentoModel, event: any): DocumentoModel => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return new DocumentoModel()
    }
    return { ...state, [event.name]: event.value }
}

export default function AxDocumento({ ID, setID, setEstadoEdicion }: TypeFormularioProps) {
    const { data: listaGrupo } = useSWRImmutable('/api/grupo/edicion', fetcherGrupo);
    const { data: listaTipoDocumento } = useSWRImmutable('/api/tipo-documento/edicion', fetcherTipoDocumento);
    const { data: listaArea } = useSWRImmutable('/api/area/edicion', fetcherArea);
    const { data: listaConsideracion } = useSWRImmutable('/api/consideracion/edicion', fetcherConsideracion);
    const [formData, setFormData] = useReducer(formReducer, new DocumentoModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setTipoEdicion(ID == "$ADD" ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (ID == "$ADD") {
            setFormData({ FORM_ADD: true })
        }
        else {
            const fetchData = async () => {
                const response = await fetch(`/api/documento/${ID}`);
                const data: DocumentoModel = await response.json();
                setFormData({ FORM_DATA: data });
            }
            fetchData().catch(console.error);
        }
        setIsLoading(false)
    }, [ID])

    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        if (event.target.name == "IDDocumentoConsideraciones") {
            const indexAnterior = formData.IDDocumentoConsideraciones.indexOf(event.target.value);
            if (indexAnterior != -1) formData.IDDocumentoConsideraciones.splice(indexAnterior, 1);
            else formData.IDDocumentoConsideraciones.push(event.target.value);
            setFormData({
                name: event.target.name,
                value: [...formData.IDDocumentoConsideraciones]
            })
        }
        else {
            setFormData({
                name: event.target.name,
                value: isCheckbox ? event.target.checked : event.target.value,
            })
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        const dataEnvio = JSON.stringify(formData);
        const response = await fetch('/api/documento/edicion', {
            body: dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })

        const result: DocumentoModel = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setID(result.ID);
        setIsSubmitting(false);
        setOpen(false);
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) setID("$NULL");
        setTipoEdicion(EnumTipoEdicion.VISUALIZAR)
        setEstadoEdicion(EnumEstadoEdicion.GUARDADO);
    }

    return (
        <>
            <nav className="flex items-start pb-1 sm:hidden" aria-label="Breadcrumb">
                <button
                    onClick={() => { setEstadoEdicion(EnumEstadoEdicion.CANCELADO); }}
                    className="hover:bg-indigo-200 rounded-sm p-2 inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                    <ChevronLeftIcon className="-ml-2 h-5 w-5 text-indigo-700" aria-hidden="true" />
                    <span>Lista de Documentos</span>
                </button>
            </nav>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl"}>
                <div className="divide-y divide-gray-200">
                    {/*PORTADA*/}
                    <div className="pb-6">
                        <div className="h-12 bg-indigo-700 rounded-md" />
                        <div className="-mt-8 flex items-end px-6">
                            {/*CABECERA*/}
                            <div className="ml-6 flex-1">
                                <div className="-mt-2">
                                    <h3 className="font-bold text-white text-2xl">{formData.Nombre ? formData.Nombre : "..."}</h3>
                                </div>
                                {/*AREA DE EDICIÓN*/}
                                <div className="w-0 flex-1 pt-2">
                                    <div className="mt-2 flex">
                                        <AxBtnEditar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion}  ></AxBtnEditar>
                                        <AxBtnEliminar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setOpen={setOpen} > </AxBtnEliminar>
                                    </div>
                                    <Transition.Root show={open} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={setOpen}>
                                            <AxModalEliminar setOpen={setOpen} setTipoEdicion={setTipoEdicion} formData={formData.Nombre} isSubmitting={isSubmitting} handleSubmit={handleSubmit} nombreModal={"documento"}> </AxModalEliminar>
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
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-6">
                                            <div className="md:col-span-2">
                                                <AxInput name="NroDocumento" label="Nro Documento" value={formData.NroDocumento} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="Codigo" label="Código" value={formData.Codigo} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="Nombre" label="Nombre" value={formData.Nombre} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="Descripcion" label="Descripción" value={formData.Descripcion} handleChange={handleChange} type="text" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="TiempoEntrega" label="Tiempo Entrega" value={formData.TiempoEntrega} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="Costo" label="Costo" value={formData.Costo} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="IDGrupo" value={formData.IDGrupo} label="Grupo" handleChange={handleChange}>
                                                    {listaGrupo && listaGrupo.map((grupo: any) => <option key={grupo.ID} value={"/grupo/" + grupo.ID}>{grupo.Nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="IDTipoDocumento" value={formData.IDTipoDocumento} label="Tipo Documento" handleChange={handleChange}>
                                                    {listaTipoDocumento && listaTipoDocumento.map((tipodoc: any) => <option key={tipodoc.ID} value={"/tipo-documento/" + tipodoc.ID}>{tipodoc.Nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelectMultiple name="IDDocumentoConsideraciones" value={formData.IDDocumentoConsideraciones} label="Consideraciones" handleChange={handleChange}>
                                                    {listaConsideracion && listaConsideracion.map((consideracion: any) => <option key={consideracion.ID} value={"/consideracion-documento/" + consideracion.ID}>{consideracion.Nombre}</option>)}
                                                </AxSelectMultiple>
                                            </div>


                                            {/* <div className="md:col-span-3">
                                                <AxSelect name="IDTipoDocumento" value={formData.IDTipoDocumento} label="Tipo Documento" handleChange={handleChange}>
                                                    {listaTipoDocumento && listaTipoDocumento.map((tipodoc: any) => <option key={tipodoc.ID} value={"/tipo-documento/" + tipodoc.ID}>{tipodoc.Nombre}</option>)}
                                                </AxSelect>
                                            </div> */}
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-6 inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <span className="mt-10">Agregar Consideraciones</span>
                                    </div>
                                </fieldset>
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
