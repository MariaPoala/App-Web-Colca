import { SearchIcon, FilterIcon, ChevronRightIcon, MailIcon, UsersIcon } from '@heroicons/react/solid'
import { Fragment, useState, useEffect } from 'react'
import { UserAddIcon } from '@heroicons/react/solid'
import AxEmpleado from 'pages/empleado/ax-empleado'
import AxInicio from 'components/ax-inicio'
import React from 'react'
import Head from 'next/head'
import { Combobox, Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();

export default function Example() {
    const [idEmpleado, setIdEmpleado] = useState(-1)
    const [listaEmpleado, setListaEmpleado] = useState<Array<any>>([]);
    const [luegoEdicion, setLuegoEdicion] = useState("INICIAL")
    const [isLoading, setIsLoading] = useState(true);
    const [tipoFiltro, setTipoFiltro] = useState("TODOS")
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? listaEmpleado
            :
            listaEmpleado.filter((empleado) => {
                return empleado.Nombres.toLowerCase().includes(query.toLowerCase()), empleado.Apellidos.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        if (luegoEdicion == "LISTA") return;
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch(`/api/empleado`);
            const data = await response.json();
            setListaEmpleado(data);
            setIsLoading(false)
            setLuegoEdicion("LISTA");
        }
        fetchData().catch(console.error);
    }, [luegoEdicion])

    return (
        <>
            <Head>
                <title>Empleado</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={isLoading ? "animate-pulse" : "" + " h-full flex flex-col"}>
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        {/*DETALLE DEL EMPLEADO*/}
                        {/* <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" > */}
                        <div className="invisible sm:visible min-h-0 flex-1 overflow-y-auto sm:pl-72 md:pl-80 lg:pl-80">
                            <div className="bg-white p-1 lg:p-4 shadow">
                                <div className="">
                                    {idEmpleado == -1 ?
                                        <AxInicio nombre={"Empleado"}></AxInicio>
                                        : <AxEmpleado idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado} setLuegoEdicion={setLuegoEdicion}></AxEmpleado>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*LISTA DE EMPLEADOS*/}
                        {/* <aside className="md:flex-shrink-0 md:order-first "> */}
                        <aside className="flex-shrink-0 order-first fixed inset-y-0 mt-16 w-full sm:w-72 md:w-80 lg:w-80">
                            <div className="h-full relative flex flex-col border-r border-gray-200 bg-gray-100">
                                {/*CABECERA */}
                                <div className="flex-shrink-0">
                                    <div className="px-6 pt-2 pb-2 ">
                                        <h2 className="text-lg font-medium text-gray-900">Lista de Empleados</h2>
                                        <div className="mt-2 flex space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <label htmlFor="search" className="sr-only">
                                                    Search
                                                </label>
                                                <div className="relative rounded-md shadow-sm overflow-y-auto">
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
                                                                placeholder="Search..."
                                                                onChange={(event) => setQuery(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Menu as="div" className="relative z-1 inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        <FilterIcon className={(tipoFiltro == "ACTIVO" ? "text-green-400 " : tipoFiltro == "DESACTIVADO" ? "text-red-400 " : "text-blue-300 ") + "  h-5 w-5 "} aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95"                                                >
                                                    <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <a onClick={() => {setTipoFiltro("ACTIVO") }} className={(tipoFiltro == "ACTIVO" ? "bg-indigo-100" : "" ) + " hover:bg-indigo-200 block px-4 py-2 text-sm font-medium text-gray-900"}>
                                                                <span className="absolute  right-16 block h-3 w-3 rounded-full ring-2 ring-white bg-green-300" />
                                                                Activos
                                                            </a>

                                                            <a onClick={() => { setTipoFiltro("DESACTIVADO") }} className={(tipoFiltro == "DESACTIVADO" ? "bg-indigo-100" : "") + " hover:bg-indigo-200 block px-4 py-2 text-sm font-medium text-gray-900"}>
                                                                <span className="absolute  right-16 block h-3 w-3 rounded-full ring-2 ring-white bg-red-400" />
                                                                Inactivos
                                                            </a>
                                                            <a onClick={() => { setTipoFiltro("TODOS") }} className={(tipoFiltro == "TODOS" ? "bg-indigo-100" : "") + " hover:bg-indigo-200 block px-4 py-2 text-sm font-medium text-gray-900"}>
                                                                <span className="absolute  right-16 block h-3 w-3 rounded-full ring-2 ring-white bg-blue-300" />
                                                                Todos
                                                            </a>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <div className='flex-1'>
                                                <p className="text-sm font-medium text-gray-500">{filteredPeople?.length || 0} Registros</p>
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
                                        {filteredPeople.length > 0 && (
                                            <ul role="list" className="divide-y divide-gray-200">
                                                {filteredPeople && filteredPeople.map((empleado) => (
                                                    
                                                    (tipoFiltro == "TODOS" || empleado.EsActivo == (tipoFiltro == "ACTIVO") ?
                                                        <li key={empleado.id}>
                                                            <a onClick={() => { setIdEmpleado(empleado.id) }}
                                                                className={(empleado.id == idEmpleado ? "bg-indigo-100" : "") + " block hover:bg-indigo-200"}>
                                                                <div className="flex px-4 py-4 sm:px-6">
                                                                    <div className="min-w-0 flex-1 flex">
                                                                        <div className="flex-shrink-0">
                                                                            {
                                                                                empleado.ImgURL
                                                                                    ? <img className="h-12 w-12 rounded-full" src={empleado.ImgURL} alt="" >
                                                                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
                                                                                    </img>
                                                                                    : <span className="inline-block relative">
                                                                                        <svg className="bg-indigo-300 text-white h-12 w-12 rounded-full" viewBox="0 0 20 20" fill="currentColor">
                                                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                                        </svg>
                                                                                        <span className={(empleado.EsActivo == true ? " bg-green-400 " : " bg-red-400 ") + " absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white "} />
                                                                                    </span>
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
                                                        </li> : ""
                                                    ))
                                                )};

                                            </ul>
                                        )}
                                        {query !== '' && filteredPeople.length === 0 && (
                                            <div className="py-14 px-4 text-center sm:px-14">
                                                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                                <p className="mt-4 text-sm text-gray-900">No se encontraron distritos usando ese término de búsqueda.</p>
                                            </div>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </aside>
                    </main>
                </div >
            </div >
        </>
    )
}
