import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import useSWRImmutable from 'swr/immutable'
import { Fragment, useState } from 'react'
import {
    ArchiveIcon as ArchiveIconSolid,
    UserAddIcon,
} from '@heroicons/react/solid'

import AxDetalle from './Empleado/AxDetalle'


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
    const [clic, setclic] = useState(false);    
    return (
        <>
            <div className="h-full flex flex-col">
                {/* Bottom section */}
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    {/* Narrow sidebar*/}
                    {/* Main area */}
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        <AxDetalle idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado} clic></AxDetalle>
                        {/* Message list*/}
                        <aside className="md:flex-shrink-0 md:order-first ">
                            <div className="h-full relative flex flex-col w-96 md:w-96 border-r border-gray-200 bg-gray-100">
                                <div className="flex-shrink-0">
                                    <div className="h-16 bg-white px-6 flex flex-col justify-center">
                                        <div className="flex items-baseline space-x-3">
                                            <h2 className="text-lg font-medium text-gray-900">Lista de Empleados</h2>
                                            <button onClick={() => { setIdEmpleado(0) }} type="button" className="bg-blue-200 p-1 rounded-full text-blue-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <span className="sr-only">Agregar Empleado</span>
                                                <UserAddIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                        <p className="text-sm font-medium text-gray-500">{fetcherEmpleado.length} Registros</p>
                                    </div>
                                </div>
                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {data && data.map((item) => (
                                                <li key={item.id}>
                                                    <a onClick={() => {
                                                        setIdEmpleado(item.id)
                                                    }} className="block hover:bg-gray-50">
                                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                                            <div className="min-w-0 flex-1 flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <img className="h-12 w-12 rounded-full" src={item.ImgURL} alt="" />
                                                                </div>
                                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols md:gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-indigo-600 truncate">{item.Nombres + ' ' + item.Apellidos}</p>
                                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                            <span className="truncate">{item.Email}</span>
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                                <button
                                                                    onClick={() => setOpen(true)}
                                                                    type="button"
                                                                    className="md:hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                                                >

                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                    </svg>

                                                                </button>
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
