import Head from 'next/head'
import useSWR from 'swr'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { XCircleIcon } from '@heroicons/react/outline';

export const getServerSideProps = withPageAuthRequired();

interface IInfoPaciente {
    ID: number
    Documento: number
    ApellidoPaterno: string
    ApellidoMaterno: string
    Nombres: string
    Direccion: string
    Telefono: number
    FechaNacimiento: Date
    Edad: number
    Email: string
    Localidad: string
    LugarNacimiento: string
}

const fetcherInfoPaciente = (url: string, params: any): Promise<IInfoPaciente> =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());

export default function AxpMiPerfil({ user }: any) {
    const { data: informacionPaciente } = useSWR(['/api/infopaciente'], fetcherInfoPaciente)
    return (<>
        <Head>
            <title>Mi Perfil - Municipalidad de Colca</title>
        </Head>
        {!informacionPaciente ?
             <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">

             <div className="bg-white rounded-lg shadow overflow-hidden">
                 <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0">
                     <div className="divide-y divide-gray-200 lg:col-span-2 " ></div>
                     <form className="divide-y divide-gray-200 lg:col-span-8 " action="#" method="POST" >
                         <div className="py-6 px-4 sm:p-6 lg:pb-8">
                             <div className="rounded-md bg-red-50 p-4 ">
                                 <div className="flex">
                                     <div className="flex-shrink-0">
                                         <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                     </div>
                                     <div className="ml-3">
                                         <h3 className="text-sm font-medium text-red-800">¡Alerta de Autenticación!</h3>
                                         <div className="mt-2 text-sm text-red-700">
                                             <ul role="list" className="list-disc pl-5 space-y-1">
                                                 <li>Usuario no se encuentra registrado en la base de datos de la Clínica Ortega</li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div>
                                 <h2 className="text-lg p-6 leading-6 font-medium text-gray-900">Mi Perfil</h2>
                             </div>

                             <div className="mt-6 flex flex-col lg:flex-row">

                                 <div className="flex-grow space-y-6">
                                     <div>
                                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                             Email
                                         </label>
                                         <div className="mt-1 rounded-md shadow-sm flex">
                                             <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                                 Usuario
                                             </span>
                                             <input type="text" name="username" id="username" disabled
                                                 className="cursor-not-allowed focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                 defaultValue={user?.email || ""} />
                                         </div>

                                     </div>

                                     <div >
                                         <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                                             Imagen
                                         </p>
                                         <div className="mt-1 lg:hidden">
                                             <div className="flex items-center">
                                                 <div className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12" aria-hidden="true" >
                                                     <img className="rounded-full h-full w-full" src={user?.picture || ""} alt="" />
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                             <div className="hidden relative rounded-full overflow-hidden lg:block">
                                                 <img className="relative rounded-full w-40 h-40" src={user?.picture || ""} alt="" />
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </form>
                 </div>
             </div>
         </div>
            :<div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0">
                        <div className="divide-y divide-gray-200 lg:col-span-2 " ></div>

                        <form className="divide-y divide-gray-200 lg:col-span-8 " action="#" method="POST" >
                            {/* Profile section */}
                            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                <div>
                                    <h2 className="text-lg leading-6 font-medium text-gray-900">Mi Perfil</h2>

                                </div>

                                <div className="mt-6 flex flex-col lg:flex-row">
                                    <div className="flex-grow space-y-6">
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <div className="mt-1 rounded-md shadow-sm flex">
                                                <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                                    Usuario
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"

                                                    disabled
                                                    autoComplete="username"
                                                    className="cursor-not-allowed focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                    defaultValue={user?.email || ""}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Nombres
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"

                                                disabled
                                                autoComplete="given-name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                defaultValue={informacionPaciente.Nombres}
                                            />

                                        </div>

                                    </div>

                                    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                        <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                                            Imagen
                                        </p>

                                        <div className="mt-1 lg:hidden">
                                            <div className="flex items-center">
                                                <div
                                                    className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                                    aria-hidden="true"
                                                >
                                                    <img className="rounded-full h-full w-full" src={user?.picture || ""} alt="" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">

                                            <div className="hidden relative rounded-full overflow-hidden lg:block">
                                                <img className="relative rounded-full w-40 h-40" src={user?.picture || ""} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Apellido Paterno
                                        </label>
                                        <input
                                            type="text"

                                            disabled
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.ApellidoPaterno}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Apellido Materno
                                        </label>
                                        <input
                                            type="text"

                                            disabled
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.ApellidoMaterno}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Nro. Documento
                                        </label>
                                        <input
                                            type="text"

                                            disabled
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.Documento}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Telefono
                                        </label>
                                        <input
                                            type="text"

                                            disabled
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.Telefono}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Dirección
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"

                                            disabled
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.Direccion}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-6">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Localidad
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"

                                            disabled
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.Localidad.toString()}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-4">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Lugar Nacimiento
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"

                                            disabled
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.LugarNacimiento.toString()}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-4">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Fecha Nacimiento
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            disabled
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.FechaNacimiento.toString()}
                                        />
                                    </div>

                                    <div className="col-span-12 sm:col-span-4">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Edad
                                        </label>
                                        <input
                                            type="number"
                                            name="last-name"
                                            id="last-name"
                                            disabled
                                            autoComplete="family-name"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                            defaultValue={informacionPaciente.Edad.toString()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
    )
}