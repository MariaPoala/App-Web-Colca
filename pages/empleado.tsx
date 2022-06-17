import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/solid'
import useSWRImmutable from 'swr/immutable'
import { Fragment, useState } from 'react'
import { UserAddIcon } from '@heroicons/react/solid'
import AxEmpleado from './Empleado/AxEmpleado'

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
    return (
        <>
            <div className="h-full flex flex-col">
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" >

                            <div className="min-h-0 flex-1 overflow-y-auto">
                                <div className="bg-white pt-5 pb-6 shadow">
                                    <div className="px-4 ">
                                        {idEmpleado == -1 ?
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                                                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                </svg>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                                                <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                                                <div className="mt-6">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                        New Project
                                                    </button>
                                                </div>
                                            </div>
                                            : <AxEmpleado idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado}></AxEmpleado>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <aside className="md:flex-shrink-0 md:order-first ">
                            <div className="h-full relative flex flex-col w-96 md:w-96 border-r border-gray-200 bg-gray-100">
                                <div className="flex-shrink-0">
                                    <div className="h-16 bg-white px-6 flex flex-col justify-center ">
                                        <div className="flex items-center space-x-4">
                                            <div className='flex-1'>
                                                <h2 className="text-lg font-medium text-gray-900 place-self-start">Lista de Empleados</h2>
                                            </div>
                                            <div>
                                                <button onClick={() => { setIdEmpleado(0) }} type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-indigo-600">
                                                    <span className="sr-only">Agregar Empleado</span>
                                                    <UserAddIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                        <p className="text-sm font-medium text-gray-500">{fetcherEmpleado.length} Registros</p>
                                    </div>
                                </div>

                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {data && data.map((empleado) => (
                                                <li key={empleado.id}>
                                                    <a onClick={() => { setIdEmpleado(empleado.id) }}
                                                        className={(empleado.id == idEmpleado ? "bg-indigo-50" : "") + " block hover:bg-indigo-100"}>
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
                                                                <button
                                                                    onClick={() => setOpen(true)}
                                                                    type="button"
                                                                    className="md:hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
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
