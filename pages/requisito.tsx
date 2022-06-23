import { PlusIcon, SearchIcon, FilterIcon } from '@heroicons/react/solid'
import useSWRImmutable from 'swr/immutable'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import AxDistrito from 'pages/requisito/ax-requisito'
import AxInicio from 'components/ax-inicio'
import React from 'react'

export default function Ciudadano() {
    const [open, setOpen] = useState(false)
    const [listaRequisito, setListaRequisito] = useState<Array<any>>([]);
    const [luegoEdicion, setLuegoEdicion] = useState("INICIAL")
    const [isLoading, setIsLoading] = useState(true);
    const [idRequisito, setIdRequisito] = useState(-1)
    const [query, setQuery] = useState('')
    const filteredPeople =
        query === ''
            ? listaRequisito
            :
            listaRequisito.filter((requisito) => {
                return requisito.Nombre.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        if (luegoEdicion == "LISTA") return;
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch(`/api/requisito`);
            const data = await response.json();
            setListaRequisito(data);
            setIsLoading(false)
            setLuegoEdicion("LISTA");
        }
        fetchData().catch(console.error);
    }, [luegoEdicion])
    return (
        <>
            <Head>
                <title>Requisitos</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-full flex flex-col">
                <div className="min-h-0 flex-1 flex overflow-hidden ">
                    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                        {/* <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" > */}
                        <div className="min-h-0 flex-1 overflow-y-auto sm:pl-96 md:pl-96 lg:pl-96">
                            <div className="bg-white p-1 lg:p-4 shadow">
                                <div className="">
                                    {idRequisito == -1 ?
                                        <AxInicio nombre={"Requisito"}></AxInicio>
                                        : <AxDistrito idRequisito={idRequisito} setIdRequisito={setIdRequisito} setLuegoEdicion={setLuegoEdicion}></AxDistrito>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*LISTA DE EMPLEADOS*/}
                        {/* <aside className="md:flex-shrink-0 md:order-first "> */}
                        <aside className="flex-shrink-0 order-first fixed inset-y-0 mt-16 w-full sm:w-96 md:w-96 lg:w-96">
                            <div className="h-full relative flex flex-col border-r border-gray-200 bg-gray-100">
                                {/*CABECERA */}
                                <div className="flex-shrink-0">
                                    <div className="px-6 pt-2 pb-2 ">
                                        <h2 className="text-lg font-medium text-gray-900">Lista de Requisitos</h2>
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
                                                <p className="text-sm font-medium text-gray-500">{listaRequisito?.length || 0} Registros</p>
                                            </div>
                                            <div>
                                                <button onClick={() => { setIdRequisito(0) }} type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-indigo-600">
                                                    <span className="sr-only">Agregar Nuevo Requisito</span>
                                                    <PlusIcon className="h-6 w-6 border-solid " aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*LISTA DE DATOS*/}
                                <div className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden">
                                        <div className="-my-2 -mx-4  sm:-mx-6 lg:-mx-8  ">
                                            <div className="inline-block  min-w-full py-1 align-middle md:px-6 lg:px-8">
                                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                                    <table className=" min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-indigo-500">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-100 sm:pl-6"
                                                                >
                                                                    Nombre
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-100"
                                                                >
                                                                    Descripción
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">

                                                            {filteredPeople && filteredPeople.map((requisito: any) => (
                                                                <tr onClick={() => { setIdRequisito(requisito.id) }}
                                                                    key={requisito.id}
                                                                    className={(requisito.id == idRequisito ? "bg-indigo-100" : "") + "  hover:bg-indigo-200"}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                        {requisito.Nombre}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{requisito.Descripcion}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </main>
                </div >
            </div >
        </>
    )
}
