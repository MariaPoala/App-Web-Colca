import { Fragment, useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Dialog, Transition } from "@headlessui/react";
import { AxBtnCancelar, AxBtnEditar, AxInput, AxBtnEliminar, AxSelect, AxSubmit, AxModalEliminar, AxSelectMultiple } from 'components/ax-form'
import { EnumTipoEdicion, EnumEstadoEdicion, TypeFormularioProps } from 'lib/edicion'
import RegistroDocumentoModel from 'models/registro-documento-model'
import { ChevronLeftIcon } from "@heroicons/react/outline";

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
    const { data: listaCiudadano} = useSWRImmutable('/api/ciudadano/edicion', fetcherCiudadano);
    const { data: listaDocumento } = useSWRImmutable('/api/documento/edicion', fetcherDocumento);
    const [formData, setFormData] = useReducer(formReducer, new RegistroDocumentoModel());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
    const [open, setOpen] = useState(false)
    const fecha = new Date()
    useEffect(() => {
        setIsLoading(true)

        setTipoEdicion(ID == "$ADD" ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (ID == "$ADD") {
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
                    <span>Lista de Documentos Registrados</span>
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
                                {/* <div className="-mt-2">
                                    <h3 className="font-bold text-white text-2xl">{formData.Nombre ? formData.Nombre : "..."}</h3>
                                </div> */}
                                {/*AREA DE EDICIÓN*/}
                                <div className="w-0 flex-1 pt-2">
                                    <div className="mt-2 flex">
                                        <AxBtnEditar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion}  ></AxBtnEditar>
                                        <AxBtnEliminar tipoEdicion={tipoEdicion} setTipoEdicion={setTipoEdicion} setOpen={setOpen} > </AxBtnEliminar>
                                    </div>
                                    <Transition.Root show={open} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={setOpen}>
                                            <AxModalEliminar setOpen={setOpen} setTipoEdicion={setTipoEdicion} formData={formData.Nombre} isSubmitting={isSubmitting} handleSubmit={handleSubmit} nombreModal={"registrado de documento"}> </AxModalEliminar>
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
                                            {/* <div className="md:col-span-3">
                                                <AxInput name="Nombre" label="Nombre" value={formData.Nombre} handleChange={handleChange} />
                                            </div> */}
                                            <div className="md:col-span-3">
                                                <AxInput name="NroDocumento" label="NroDocumento" value={formData.NroDocumento} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="Observacion" label="Observacion" value={formData.Observacion} handleChange={handleChange} type="text" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="URLArchivo" label="URLArchivo" value={formData.URLArchivo} handleChange={handleChange} type="text" />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="IDEmpleado" value={formData.IDEmpleado} label="Empleado" handleChange={handleChange}>
                                                    {listaEmpleado && listaEmpleado.map((empleado: any) => <option key={empleado.ID} value={"/empleado/" + empleado.ID}>{empleado.Nombres}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxSelect name="IDCiudadano" value={formData.IDCiudadano} label="Ciudadano" handleChange={handleChange}>
                                                    {listaCiudadano && listaCiudadano.map((ciudadano: any) => <option key={ciudadano.ID} value={"/ciudadano/" + ciudadano.ID}>{ciudadano.Nombres}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="md:col-span-3" />
                                            <div className="md:col-span-3">
                                                <AxSelect name="IDDocumento" value={formData.IDDocumento} label="Documento" handleChange={handleChange}>
                                                    {listaDocumento && listaDocumento.map((documento: any) => <option key={documento.ID} value={"/documento/" + documento.ID}>{documento.Nombre}</option>)}
                                                </AxSelect>
                                            </div>                                            
                                        </div>
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
