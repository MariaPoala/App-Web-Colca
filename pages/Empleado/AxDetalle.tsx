import { Fragment, useState } from 'react'
import AxPersona from './AxPersona'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function AxDetalle({ idEmpleado,setIdEmpleado }: any) {
    const [tipoEdicion, setTipoEdicion] = useState("VISUALIZAR");

    return <>
        <section
            aria-labelledby="message-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
        >
            {/* Top section */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
                {/* Toolbar*/}
                <div className="h-16 flex flex-col justify-center">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="py-3 flex justify-between">
                            {/* Left buttons */}
                            <div>
                                <div className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                                    <span className="inline-flex sm:shadow-sm">
                                        <button onClick={() => { setTipoEdicion("EDITAR") }}
                                            type="button"
                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>Editar</span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Message header */}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="bg-white pt-5 pb-6 shadow">
                    {/* <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8"> */}
                    <div className="px-4 ">
                        <AxPersona idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado} tipoEdicion={idEmpleado == 0 ? "AGREGAR" : tipoEdicion}></AxPersona>
                    </div>
                </div>
            </div>

        </section>
    </>
}
