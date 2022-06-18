import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { PlusIcon, SearchIcon, FilterIcon } from '@heroicons/react/solid'
import useSWRImmutable from 'swr/immutable'
import { Fragment, useState } from 'react'
import { UserAddIcon } from '@heroicons/react/solid'
import AxEmpleado from './Empleado/AxEmpleado'
import AxInicioEmpleado from './prueba'
import { count } from 'console'
import React from 'react'

const fetcherEmpleado = (url: string, params: any): Promise<Array<any>> =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());

export default function Example() {
    const [open, setOpen] = useState(false)
    const [idEmpleado, setIdEmpleado] = useState(-1)
    const { data } = useSWRImmutable(['/api/empleado', {}], fetcherEmpleado)
    // const [count, setCount] = useState(0);
    // const {numero}= React.data.count(data);
    //   const {numero}= count(data:any[]);
    //   console.log(count(data:any[]));
    //   console.count(data);
    return (
        <>
            <div className="h-full flex flex-col">
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        {/*DETALLE DEL EMPLEADO*/}
                        {/* <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" > */}
                        <div className="invisible sm:visible min-h-0 flex-1 overflow-y-auto sm:pl-72 md:pl-80 lg:pl-80">
                            <div className="bg-white p-1 lg:p-4 shadow">
                                <div className="">
                                    {idEmpleado == -1 ?
                                        <AxInicioEmpleado></AxInicioEmpleado>

                                        : <AxEmpleado idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado}></AxEmpleado>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*LISTA DE EMPLEADOS*/}
                        {/* <aside className="md:flex-shrink-0 md:order-first "> */}
                        <aside className="flex-shrink-0 order-first w-full fixed inset-y-0 mt-16">
                            <div className="h-full relative flex flex-col w-full sm:w-72 md:w-80 lg:w-80 border-r border-gray-200 bg-gray-100">
                                {/*CABECERA */}
                                <div className="flex-shrink-0">
                                    <div className="px-6 pt-2 pb-2 ">
                                        <h2 className="text-lg font-medium text-gray-900">Lista de Empleados</h2>
                                        <div className="mt-2 flex space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <label htmlFor="search" className="sr-only">
                                                    Search
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        type="search"
                                                        name="search"
                                                        id="search"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-indigo-300 rounded-md"
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span className="sr-only">Search</span>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <div className='flex-1'>
                                                <p className="text-sm font-medium text-gray-500">{fetcherEmpleado.length} Registros</p>
                                            </div>
                                            <div>
                                                <button onClick={() => { setIdEmpleado(0) }} type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-indigo-600">
                                                    <span className="sr-only">Agregar Empleado</span>
                                                    <UserAddIcon className="h-6 w-6 border-solid " aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*EMPLEADOS*/}
                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {data && data.map((empleado) => (
                                                <li key={empleado.id}>
                                                    <a onClick={() => { setIdEmpleado(empleado.id) }}
                                                        className={(empleado.id == idEmpleado ? "bg-indigo-100" : "") + " block hover:bg-indigo-200"}>
                                                        <div className="flex px-4 py-4 sm:px-6">
                                                            <div className="min-w-0 flex-1 flex">
                                                                <div className="flex-shrink-0">
                                                                    {
                                                                        empleado.ImgURL
                                                                            ? <img className="h-12 w-12 rounded-full" src={empleado.ImgURL} alt="" />
                                                                            : <svg className="bg-indigo-300 text-white h-12 w-12 rounded-full" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                            </svg>
                                                                    }

                                                                </div>
                                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols md:gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-indigo-600 truncate">{empleado.Nombres + ' ' + empleado.Apellidos}</p>
                                                                        <p className="mt-2 flex text-sm text-gray-500">
                                                                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                            <span className="truncate">{empleado.Email}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </>
    )
}
