
import { Fragment, useEffect, useRef, useState } from 'react'
import RegistroDocumentoModel from 'models/registro-documento-model'
import useSWRImmutable from "swr/immutable"
import { AxInput, AxSelect, AxBtnEditar } from 'components/ax-form';
import { CheckCircleIcon, DocumentAddIcon, FilterIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react';
import AxRegistroDocumento from 'components/documento/ax-registro-documento'
import { EnumEstadoEdicion, EnumTipoEdicion, TypeFormularioProps } from 'lib/edicion';
const fetcherDoc = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());
const fetcherCiudadano = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());

export default function Example() {
  const { data: listaDoc } = useSWRImmutable('/api/documento/edicion', fetcherDoc);
  const { data: listaCiudadano } = useSWRImmutable('/api/ciudadano/edicion', fetcherCiudadano);
  const [IDRegistroDocumento, setIdRegistroDocumento] = useState("$NULL")
  const [listaRegistroDocumento, setListaRegistroDocumento] = useState<RegistroDocumentoModel[]>([]);
  const [abrir, setabrir] = useState(false)
  const cancelButtonRef = useRef(null)
  const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
  const [estadoEdicion, setEstadoEdicion] = useState(EnumEstadoEdicion.LISTAR)
  const [isLoading, setIsLoading] = useState(true);
  const [grupo, setGrupo] = useState("");
  const [texto, setTexto] = useState("");


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

  const resultado = Array.from(new Set(listaRegistroDocumento.map(s => s.IDDocumento)))
    .map(id => {
      return {
        id: id
      }
    });
  const handleChange = (event: any) => {
    const isCheckbox = event.target.type === 'checkbox';

    if (event.target.name == "NroDocumento") {
      setTexto(event.target.value)
    }
  }

  return (
    <>
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className=" sm:px-4 lg:max-w-6xl ">
            <div className="py-2 lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                <dd className="mt-3 gap-2 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                  <CheckCircleIcon
                    className="flex-shrink-0 mr-0 h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                  Filtrar Por:
                  
                </dd>

                <div className="mt-2 grid px-16 grid-cols-1   gap-y-6 gap-x-4 md:grid-cols-6">
                  <div className="md:col-span-1">
                    <AxSelect name="ciudadano" value="" filtro={true} label="Ciudadanos" >
                      {listaCiudadano && listaCiudadano.map((ciudadano: any) => <option key={ciudadano.ID} value={"/grupo/" + ciudadano.ID}>{ciudadano.Nombres}</option>)}
                    </AxSelect>
                  </div>
                  <div className="md:col-span-1">
                    <AxInput name="NroDocumento" label="Nro Documento" handleChange={handleChange} type="text" filtro={true} />
                  </div>                  
                  <div className="md:col-span-1">
                    <AxInput name="Fecha" label="Fecha de Documento" value="" filtro={true} type="date" />
                  </div>
                  <div className="md:col-span-2">
                  </div>
                  <div className="md:col-span-1">
                   <button type="button"
                onClick=
                {() => {
                  setIdRegistroDocumento(IDRegistroDocumento);
                  setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO);
                  setabrir(true);
                }}
                className="ml-3 h-8 mt-0 w-20 bottom-0 right-0  inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                            disabled:bg-blue-300"
              >
                Filtrar
              </button>
                </div>
                </div>
                {/* Profile */}

              </div>
             
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="max-w-6xl mx-16 px-2 sm:px-2 ">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Documentos</h2>
            <div className="mt-2 grid  gap-5 grid-cols-1 sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-3">
              {/* Card */}
              {(listaDoc && listaDoc.map((item: any) =>
              (resultado.map(s => s.id == "/documento/" + item.ID &&

                < ul key={item.ID} className="bg-white overflow-hidden shadow rounded-lg hover:bg-indigo-700"
                  onClick={() => {
                    setGrupo(item.ID);
                    setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO);
                  }}>

                  <div className="p-2 bg-indigo-100">
                    <div className="flex items-center">
                      <div
                        className="flex-shrink-0 flex items-center justify-center text-white  font-medium rounded-l-md text-lg font-serif bg-indigo-500 h-14"
                      >
                        {item.Codigo}
                      </div>
                      <div className="ml-2 w-10 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{item.Nombre}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{item.Descripcion}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </ul>
              )))
              )
              }
            </div>
          </div>
          <div className="sm:flex sm:items-center px-16 mt-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Lista </h1>
              <p className="mt-2 text-sm text-gray-700">
                Documentos registrados
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <button type="button"
                onClick=
                {() => {
                  setIdRegistroDocumento(IDRegistroDocumento);
                  setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO);
                  setabrir(true);
                }}
                className="ml-3    inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                            disabled:bg-blue-300"
              >
                <DocumentAddIcon className="h-4 w-4 mr-1 text-white" aria-hidden="true" />
                Administrar
              </button>

              <button type="button"
                onClick=
                {() => {
                  setIdRegistroDocumento("$ADD");
                  setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                  setabrir(true);
                }}
                className="ml-3    inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                            disabled:bg-blue-300"
              >
                <DocumentAddIcon className="h-4 w-4 mr-1 text-white" aria-hidden="true" />
                Agregar
              </button>


            </div>
          </div>
          <div className="hidden sm:block">
            <div className="mx-auto px-14 sm:px-16 lg:px-16">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">

                        </th>
                        <th
                          className="px-2 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          N° Documento
                        </th>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Observaciones
                        </th>
                        <th
                          className=" px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                          scope="col"
                        >
                          Archivo
                        </th>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Empleado
                        </th>

                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Ciudadano
                        </th>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Documento
                        </th>
                        <th
                          className=" px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                          scope="col"
                        >
                          Fecha Registro
                        </th>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Fecha Edicion
                        </th>

                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Fecha Documento
                        </th>
                        <th
                          className=" px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                          scope="col"
                        >
                          Fecha Anulación
                        </th>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          scope="col"
                        >
                          Motivo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listaRegistroDocumento && listaRegistroDocumento.map((item) => (
                        // ("/documento/" + grupo == item.IDDocumento ||  texto==item.NroDocumento &&
                        ("/documento/" + grupo == item.IDDocumento  && 
                          <tr key={item.ID} className="bg-white">

                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-900">
                              <input
                                onClick={() => {
                                  setIdRegistroDocumento(item.ID);
                                  setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO);
                                }}
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.NroDocumento}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.Observacion}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.URLArchivo}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.IDEmpleado}
                            </td>

                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.IDCiudadano}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.IDDocumento}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.FecRegistro}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.FecEdicion}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.FecDocumento}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.FecAnulacion}
                            </td>
                            <td className="px-6 py-3 text-center whitespace-nowrap text-sm text-gray-500">
                              {item.Motivo}
                            </td>
                          </tr>
                        )))}
                    </tbody>
                  </table>
                  {/* Pagination */}

                </div>
                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Registros <span className="font-medium">1</span> a <span className="font-medium">2</span> de{' '}
                      <span className="font-medium">{listaRegistroDocumento.length}</span> resultados
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Anterior
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Siguiente
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main >

      <Transition.Root show={abrir} as={Fragment}>

        <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setabrir}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">

            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white  rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:p-6 ">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900"> Documento</Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setabrir(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <AxRegistroDocumento ID={IDRegistroDocumento} setID={setIdRegistroDocumento} setEstadoEdicion={setEstadoEdicion} ></AxRegistroDocumento>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

