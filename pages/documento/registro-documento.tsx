import React, { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { SearchIcon, FilterIcon, ChevronRightIcon, MailIcon, UserAddIcon, UsersIcon, PhoneIcon, PlusIcon } from '@heroicons/react/solid'
import AxInicio from 'components/layout/ax_inicio'
import AxRegistroDocumento from 'modulos/documento/ax_registro_documento'
import { EnumEstadoEdicion } from 'lib/edicion'
import RegistroDocumentoModel from 'models/registro_documento_model'

export const getServerSideProps = withPageAuthRequired();

export default function AxPageDocumento() {
    const [IDDocumento, setIdDocumento] = useState(-1)
    const [listaRegistroDocumento, setListaRegistroDocumento] = useState<RegistroDocumentoModel[]>([]);
    const [estadoEdicion, setEstadoEdicion] = useState(EnumEstadoEdicion.LISTAR)
    const [isLoading, setIsLoading] = useState(true);
    const [textoFiltro, setTextoFiltro] = useState('')
 
    useEffect(() => {   
        if (estadoEdicion != EnumEstadoEdicion.LISTAR && estadoEdicion != EnumEstadoEdicion.GUARDADO) return;
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch(`/api/registro-documento/edicion`, {
                method: "GET"
            })
            const result: RegistroDocumentoModel[] = await response.json()
            setListaRegistroDocumento(result);
            setIsLoading(false)
        }
        fetchData().catch(console.error);
    }, [estadoEdicion])

    const listaFiltro = ((textoFiltro == "" ? listaRegistroDocumento : listaRegistroDocumento.filter(registrodocumento =>
        (registrodocumento.numero_documento.toUpperCase().includes(textoFiltro.toUpperCase()))
    )))
   
    return (
        <>
            <Head><title>Registro de Documento</title></Head>
            <div className={isLoading ? "animate-pulse" : "" + " h-full flex flex-col"}>
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        {/*DETALLE DEL Documento*/}
                        <div className={((estadoEdicion == EnumEstadoEdicion.SELECCIONADO || estadoEdicion == EnumEstadoEdicion.EDITANDO) ? "block" : "hidden sm:block") + " flex-1 inset-y-0 pl-0 m-1 sm:pl-72 md:pl-80 lg:pl-80 bg-white"}>
                            {IDDocumento == -1
                                ? <AxInicio nombre={"Registro de Documento"}></AxInicio>
                                : <AxRegistroDocumento ID={IDDocumento} setID={setIdDocumento} setEstadoEdicion={setEstadoEdicion} ></AxRegistroDocumento>
                            }
                        </div>
                        {/*LISTA DE Documento*/}
                        <aside className={((estadoEdicion == EnumEstadoEdicion.SELECCIONADO || estadoEdicion == EnumEstadoEdicion.EDITANDO) ? "invisible sm:visible" : "visible") + " fixed mt-16 w-full inset-y-0 sm:w-72 md:w-80 lg:w-80"}>
                            <div className="h-full relative flex flex-col border-r border-gray-200 bg-gray-100">
                                {/*CABECERA */}
                                <div className="flex-shrink-0">
                                    <div className="px-6 pt-2 pb-2 ">
                                        <h2 className="text-lg font-medium text-gray-900">Lista de Documento Registrados</h2>
                                        <div className="mt-2 flex space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="relative rounded-md shadow-sm overflow-y-auto">
                                                    <div className="flex-1 min-w-0">
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
                                                                onChange={(event) => setTextoFiltro(event.target.value)}
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
                                                <p className="text-sm font-medium text-gray-500">{
                                                    listaFiltro && listaFiltro.length || 0} Registros</p>
                                            </div>
                                            <div>
                                                <button onClick=
                                                    {() => {
                                                        setIdDocumento(0);
                                                        setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                                    }}
                                                    type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-indigo-600">
                                                    <span className="sr-only">Agregar Documento a Registrar</span>
                                                    <PlusIcon className="h-6 w-6 border-solid " aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Documentos*/}
                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {listaFiltro && listaFiltro.map(item => {
                                                return <li key={item.id}>
                                                    <a onClick={() => {
                                                        setIdDocumento(item.id);
                                                        setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO);
                                                    }}
                                                        className={(item.id == IDDocumento ? "bg-indigo-100" : "") + " block hover:bg-indigo-200"}>
                                                        <div className="flex px-4 py-4 sm:px-6">
                                                            <div className="min-w-0 flex-1 flex">
                                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols md:gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-indigo-600 truncate">{item.numero_documento}</p>
                                                                        <p className="mt-2 flex text-sm text-gray-500">
                                                                            <span className="truncate">{item.observacion}</span>
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
                                            })
                                            }
                                        </ul>
                                        {textoFiltro !== '' && listaFiltro.length === 0 && (
                                            <div className="py-14 px-4 text-center sm:px-14">
                                                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                                <p className="mt-4 text-sm text-gray-900">No se encontraron Documentos Registrados usando ese término de búsqueda.</p>
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
