import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useReducer, useRef, useState } from "react";

const enum EnumTipoEdicion {
    AGREGAR = "AGREGAR",
    EDITAR = "EDITAR",
    VISUALIZAR = "VISUALIZAR",
    ELIMINAR = "ELIMINAR"
}

const formReducer = (state: any, event: any) => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return {
            Nombre: "",
            CodigoPostal: ""
        }
    }
    return { ...state, [event.name]: event.value }
}
function AxInput({ name, value, label, handleChange, type }: any) {
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input type={type || "text"}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full md:text-sm border-gray-300 rounded-md disabled:text-gray-500"
                />
            </div>
        </>
    )
}




// function AxButtonGuardar({ loading }: any) {
//     return <button type="submit"
//         className="
//         ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
//         bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
//         disabled={loading}>
//         {
//             loading &&
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//         }
//         {}
//         Guardar
//     </button>
// }

function AxButtonGuardar({ loading, tipoEdicion }: any) {
    return <button type="submit"
        className={(tipoEdicion == EnumTipoEdicion.ELIMINAR ? " focus:ring-red-500 disabled:bg-red-400 bg-red-600 hover:bg-red-700 " : "focus:ring-indigo-500 disabled:bg-indigo-400 bg-indigo-600 hover:bg-indigo-700 ") +
            " ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"}
        disabled={loading}>
        {
            loading &&
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        }
        {tipoEdicion == EnumTipoEdicion.ELIMINAR ? "Eliminar" : "Guardar"}
    </button>
}

function AxBtnGuardarEliminar({ loading, onClick }: any) {
    return <button type="button"
        onClick={onClick}
        className="focus:ring-red-500 disabled:bg-red-400 bg-red-600 hover:bg-red-700 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"
        disabled={loading}>
        {
            loading &&
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        }
        Eliminar
    </button>
}

export default function AxDistrito({ idDistrito, setIdDistrito, setLuegoEdicion }: any) {
    const [formData, setFormData] = useReducer(formReducer, { Nombre: 'Colca', count: 100 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)



    useEffect(() => {
        setTipoEdicion(idDistrito == 0 ? EnumTipoEdicion.AGREGAR : EnumTipoEdicion.VISUALIZAR);
        if (idDistrito == 0) {
            setFormData({ FORM_ADD: true })
        }
        else {
            setIsLoading(true)
            const fetchData = async () => {
                // await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`/api/Distrito/${idDistrito}`);
                const data = await response.json();
                setFormData({ FORM_DATA: data });
                setIsLoading(false)
            }
            fetchData().catch(console.error);
        }
    }, [idDistrito])

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
        const dataEnvio = JSON.stringify({ ...formData, idDistrito: idDistrito });
        const dataEnvioDelete = JSON.stringify({ idDistrito: idDistrito });
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) console.log("0");
        const response = await fetch('/api/Distrito/edicion', {
            body: tipoEdicion == EnumTipoEdicion.ELIMINAR ? dataEnvioDelete : dataEnvio,
            headers: { 'Content-Type': 'application/json', },
            method: tipoEdicion == EnumTipoEdicion.EDITAR ? "PUT" : tipoEdicion == EnumTipoEdicion.ELIMINAR ? "DELETE" : "POST"
        })

        const result = await response.json()
        if (tipoEdicion == EnumTipoEdicion.AGREGAR) setIdDistrito(result.idDistrito);
        setIsSubmitting(false);
        setLuegoEdicion("GRABAR");
        setOpen(false);
        if (tipoEdicion == EnumTipoEdicion.ELIMINAR) setIdDistrito(-1);
        setTipoEdicion(EnumTipoEdicion.VISUALIZAR)
    }
    return (
        <>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl"}>
                <div className="divide-y divide-gray-200">
                    {/*PORTADA*/}
                    <div className="pb-6">
                        <div className="h-16 bg-indigo-700 rounded-md" />
                        <div className="-mt-8 flex items-end px-6">
                            {/*IMG PERFIL*/}
                            {/*CABECERA*/}
                            <div className="ml-6 flex-1">
                                {/*AREA DE EDICIÓN*/}
                                <div className="w-0 flex-1 pt-2">
                                    <div className="mt-2 flex " >

                                        <button type="button" disabled={tipoEdicion == EnumTipoEdicion.EDITAR || tipoEdicion == EnumTipoEdicion.AGREGAR}
                                            onClick={() => setTipoEdicion(EnumTipoEdicion.EDITAR)}
                                            className="ml-3 inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                            disabled:bg-indigo-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Editar
                                        </button>

                                        <button type="button" disabled={tipoEdicion == EnumTipoEdicion.EDITAR || tipoEdicion == EnumTipoEdicion.AGREGAR}
                                            onClick={() => { setTipoEdicion(EnumTipoEdicion.ELIMINAR), setOpen(true) }}
                                            className="ml-3 inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                            disabled:bg-indigo-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4  w-4 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Eliminar
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*FORMULARIO*/}
                    <div className="px-0 py-0">
                        <div className="p-4 md:p-6">
                            <Transition.Root show={open} as={Fragment}>
                                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                    </Transition.Child>

                                    <div className="fixed z-10 inset-0 overflow-y-auto">
                                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                                    Alerta
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-lg text-gray-500">
                                                                        {`Estas seguro que quieres eliminar al Distrito: ${formData.Nombre}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <div className="pt-5">
                                                            <div className="flex justify-end">
                                                                <button onClick={() => setOpen(false)} type="button"
                                                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                                <AxBtnGuardarEliminar loading={isSubmitting}
                                                                    onClick={(event: any) => {
                                                                        setTipoEdicion(EnumTipoEdicion.ELIMINAR);
                                                                        handleSubmit(event);
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <fieldset disabled={tipoEdicion == EnumTipoEdicion.VISUALIZAR} className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 md:grid-cols-6">

                                            <div className="hidden md:flex md:col-span-4" />
                                            <div className="md:col-span-3">
                                                <AxInput name="Nombre" label="Nombre" value={formData.Nombre} handleChange={handleChange} />
                                            </div>
                                            <div className="md:col-span-3">
                                                <AxInput name="CodigoPostal" label="Código Postal" value={formData.CodigoPostal} handleChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>

                                {(tipoEdicion == EnumTipoEdicion.EDITAR || tipoEdicion == EnumTipoEdicion.AGREGAR) &&
                                    <div className="pt-5">
                                        <div className="flex justify-end ">
                                            <button onClick={() => { tipoEdicion == EnumTipoEdicion.EDITAR ? setTipoEdicion(EnumTipoEdicion.VISUALIZAR) : setIdDistrito(-1) }} type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Cancelar
                                            </button>
                                            <AxButtonGuardar loading={isSubmitting} tipoEdicion={tipoEdicion} />
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
