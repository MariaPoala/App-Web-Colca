import { useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AxCheck, AxInput, AxRadio, AxSelect, AxSubmit, AxBtnEliminar } from 'components/ax-form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import GrupoModel from 'models/grupo-model'
import { ChevronLeftIcon } from "@heroicons/react/outline"

export const getServerSideProps = withPageAuthRequired();

const formReducer = (state: GrupoModel, event: any): GrupoModel => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return new GrupoModel()
    }
    return { ...state, [event.name]: event.value }
}

export default function AxGrupo({ ID, setID, setEstadoEdicion }: TypeFormularioProps) {
    const [formData, setFormData] = useReducer(formReducer, new GrupoModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)

    useEffect(() => {
        setIsLoading(true)
        setTipoEdicion(ID == "$ADD" ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (ID == "$ADD") {
            setFormData({ FORM_ADD: true })
        }
        else {
            const fetchData = async () => {
                const response = await fetch(`/api/grupo/${ID}`);
                const data: GrupoModel = await response.json();
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
        const response = await fetch('/api/grupo/edicion', {
            body: dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })
        
        const result: GrupoModel = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setID(result.ID);
        setIsSubmitting(false);
        setTipoEdicion(EnumTipoEdicion.VISUALIZAR)
        setEstadoEdicion(EnumEstadoEdicion.GUARDADO);
    }
console.log(tipoEdicion)
    return (
        <>
            <nav className="flex items-start pb-1 sm:hidden" aria-label="Breadcrumb">
                <button
                    onClick={() => { setEstadoEdicion(EnumEstadoEdicion.CANCELADO); }}
                    className="hover:bg-indigo-200 rounded-sm p-2 inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                    <ChevronLeftIcon className="-ml-2 h-5 w-5 text-indigo-700" aria-hidden="true" />
                    <span>Lista de Grupos</span>
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
                                        <button type="button" disabled={tipoEdicion != EnumTipoEdicion.VISUALIZAR}
                                            onClick={() => {
                                                setTipoEdicion(EnumTipoEdicion.EDITAR);
                                                setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                            }}
                                            className="ml-3 inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                            disabled:bg-indigo-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Editar
                                        </button>
                                        <AxBtnEliminar loading={isSubmitting}
                                            onClick={(event: any) => {
                                                setTipoEdicion(EnumTipoEdicion.ELIMINAR)
                                                // setEstadoEdicion(EnumEstadoEdicion.GUARDADO)
                                                handleSubmit(event);
                                            }}> </AxBtnEliminar>
                                    </div>
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
                                                <AxInput name="Nombre" label="Nombre" value={formData.Nombre} handleChange={handleChange} />
                                            </div>
                                            <div className="hidden md:flex md:col-span-4" />
                                            <div className="md:col-span-3">
                                                <AxInput name="Icono" label="Icono" value={formData.Icono} handleChange={handleChange} />
                                            </div>

                                        </div>
                                    </div>
                                </fieldset>
                                {tipoEdicion != EnumTipoEdicion.VISUALIZAR && <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button onClick={() => {
                                            tipoEdicion == EnumTipoEdicion.EDITAR ? setTipoEdicion(EnumTipoEdicion.VISUALIZAR) : setID("$NULL");
                                            setEstadoEdicion(EnumEstadoEdicion.CANCELADO);
                                        }} type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
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
