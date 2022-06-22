import { CheckCircleIcon, ChevronRightIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { PlusIcon, SearchIcon, FilterIcon } from '@heroicons/react/solid'
import { Fragment, useState, useEffect } from 'react'
import { UserAddIcon } from '@heroicons/react/solid'
import AxCiudadano from 'pages/ciudadano/ax-ciudadano'
import AxInicio from 'components/ax-inicio'
import React from 'react'

export default function Example() {
    const [idCiudadano, setIdCiudadano] = useState(-1)
    const [listaCiudadano, setListaCiudadano] = useState<Array<any>>([]);
    const [luegoEdicion, setLuegoEdicion] = useState("INICIAL")
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? listaCiudadano
            :
            listaCiudadano.filter((Ciudadano) => {
                return Ciudadano.Nombres.toLowerCase().includes(query.toLowerCase()),Ciudadano.Apellidos.toLowerCase().includes(query.toLowerCase())
             
            })

    useEffect(() => {
        if (luegoEdicion == "LISTA") return;
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch(`/api/ciudadano`);
            const data = await response.json();
            setListaCiudadano(data);
            setIsLoading(false)
            setLuegoEdicion("LISTA");
        }
        fetchData().catch(console.error);
    }, [luegoEdicion])
    return (
        <>
            <div className={isLoading ? "animate-pulse" : "" + " h-full flex flex-col"}>
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        {/*DETALLE DEL EMPLEADO*/}
                        {/* <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" > */}
                        <div className="invisible sm:visible min-h-0 flex-1 overflow-y-auto sm:pl-72 md:pl-80 lg:pl-80">
                            <div className="bg-white p-1 lg:p-4 shadow">
                                <div className="">
                                    {idCiudadano == -1 ?
                                        <AxInicio></AxInicio>
                                        : <AxCiudadano idCiudadano={idCiudadano} setIdCiudadano={setIdCiudadano} setLuegoEdicion={setLuegoEdicion}></AxCiudadano>
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
                                        <h2 className="text-lg font-medium text-gray-900">Lista de Ciudadanos</h2>
                                        <div className="mt-2 flex space-x-4">
                                            <div className="flex-1 min-w-0">                                              
                                                <div className="relative rounded-md shadow-sm overflow-y-auto">
                                                    <div className="flex-1 min-w-0">
                                                        <label htmlFor="search" className="sr-only">
                                                        Buscar
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
                                                                placeholder="Buscar..."
                                                                onChange={(event) => setQuery(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <div className='flex-1'>
                                                <p className="text-sm font-medium text-gray-500">{listaCiudadano?.length || 0} Registros</p>
                                            </div>
                                            <div>
                                                <button onClick={() => { setIdCiudadano(0) }} type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-indigo-600">
                                                    <span className="sr-only">Agregar Ciudadano</span>
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
                                                {filteredPeople && filteredPeople.map((ciudadano) => (
                                                        <li key={ciudadano.id}>
                                                            <a onClick={() => { setIdCiudadano(ciudadano.id) }}
                                                                className={(ciudadano.id == idCiudadano ? "bg-indigo-100" : "") + " block hover:bg-indigo-200"}>
                                                                <div className="flex px-4 py-4 sm:px-6">
                                                                    <div className="min-w-0 flex-1 flex">                                                                        
                                                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols md:gap-4">
                                                                            <div>
                                                                                <p className="text-sm font-medium text-indigo-600 truncate">{ciudadano.Nombres + ' ' + ciudadano.Apellidos}</p>
                                                                                <p className="mt-2 flex text-sm text-gray-500">
                                                                                    <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    <span className="truncate">{ciudadano.Email}</span>
                                                                                </p>
                                                                                <p className="mt-2 flex text-sm text-gray-500">
                                                                                    <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                                    <span className="truncate">{ciudadano.Celular}</span>
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
                                                    )
                                                )};

                                            </ul>
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
