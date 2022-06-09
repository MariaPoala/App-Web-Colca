import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ArchiveIcon as ArchiveIconSolid,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {
    ArchiveIcon as ArchiveIconOutline,
    BanIcon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    MenuIcon,
    PencilAltIcon,
    UserCircleIcon,
    XIcon,
} from '@heroicons/react/outline'
import AxPerson2 from './AxPersona2'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const fetcherEmpleado = (url: string, params: any): Promise<any> =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());

const fetcherDistrito = (url: string): Promise<any> =>
    fetch(url, { method: 'GET' }).then(r => r.json());

export default function AxPersona({ idEmpleado }: any) {
    const [open, setOpen] = useState(true)

    const { data } = useSWRImmutable(idEmpleado ? ['/api/empleadoDetalle', { idEmpleado: idEmpleado }] : null, fetcherEmpleado)
    const { data: listaDistrito } = useSWRImmutable(idEmpleado ? '/api/distrito' : null, fetcherDistrito)

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        let form = event.target;
        const dataForm = {
            idEmpleado: idEmpleado,
            DNI: form.DNI.value,
            Nombres: form.Nombres.value,
        }

        const JSONdata = JSON.stringify(dataForm)
        const response = await fetch('/api/guardarempleado', {
            body: JSONdata,
            headers: { 'Content-Type': 'application/json', },
            method: 'PUT'
        })

        const result = await response.json()
        alert(`Is this your full name: ${result}`)
       
    }

    return (
        <>
            <div className="flex h-full flex-col bg-white shadow-xl">
                {/* Main */}
                <div className="divide-y divide-gray-200">
                    <div className="pb-6">
                        <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                        <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                            <div>
                                <div className="-m-1 flex">
                                    <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                        {
                                            data ?
                                                <img
                                                    className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                                    src={data.ImgURL}
                                                />
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" className="bg-indigo-300 text-white h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 sm:ml-6 sm:flex-1">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{data ? data.Nombres + " " + data.Apellidos : ""}</h3>
                                        <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                            <span className="sr-only">Online</span>
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{data ? data.Email : ""}</p>
                                </div>
                                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">

                                    <button
                                        type="button"
                                        className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Enviar mensaje
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Llamar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <div className="p-4 md:p-6">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <div className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                                            {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    DNI
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="DNI"
                                                        name="DNI"
                                                        type="text"
                                                        defaultValue={data ? data.Dni : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4" />
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Nombres
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="Nombres"
                                                        id="Nombres"
                                                        autoComplete="given-name"
                                                        defaultValue={data ? data.Nombres : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Apellidos
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        defaultValue={data ? data.Apellidos : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Fecha Nacimiento
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        autoComplete="email"
                                                        defaultValue={data ? data.FechaNacimiento : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Sexo
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        defaultValue={data ? data.Sexo : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option>MUJER</option>
                                                        <option>VARON</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Correo Electronico
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        defaultValue={data ? data.Email : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Nro Celular
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        autoComplete="email"
                                                        defaultValue={data ? data.Celular : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Distrito
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        value={data ? data.IDDistritoRef : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        {
                                                            listaDistrito && listaDistrito.map((distrito: any) =>
                                                                <option key={distrito.id} value={"/distrito/" + distrito.id}>{distrito.Nombre}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                    Dirección
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        defaultValue={data ? data.Direccion : ""}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Condiciones</h3>
                                            {/* <p className="mt-1 text-sm text-gray-500">
                                                We'll always let you know about important changes, but you pick what else you want to hear about.
                                            </p> */}
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                <legend className="sr-only">By Email</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    Laboral
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="comments"
                                                                name="comments"
                                                                type="checkbox"
                                                                defaultChecked={data ? data.EsActivo : ""}
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                                ¿Es Activo?
                                                            </label>
                                                            {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>
                                            <fieldset className="mt-6">
                                                <legend className="contents text-base font-medium text-gray-900">Tipo de Contrato</legend>
                                                {/* <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p> */}
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-everything"
                                                            name="push-notifications"
                                                            type="radio"
                                                            defaultChecked={data ? data.TipoContrato == "Indefinido" : false}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Indefinido
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-email"
                                                            name="push-notifications"
                                                            type="radio"
                                                            defaultChecked={data ? data.TipoContrato == "Contrato3Meses" : false}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Contrato 3 Meses
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="push-nothing"
                                                            name="push-notifications"
                                                            type="radio"
                                                            defaultChecked={data ? data.TipoContrato == "Contrato6Meses" : false}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Contrato 6 Meses
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form >
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}
