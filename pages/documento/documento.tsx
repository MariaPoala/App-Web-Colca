
import { Fragment, useEffect, useState } from 'react'
import useSWRImmutable from "swr/immutable"
import { CheckCircleIcon, BadgeCheckIcon, RefreshIcon, BanIcon, XIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { AxInput, AxSelectFiltro, AxBtnEditar, AxPagination, AxBtnAgregar, AxBtnEditarLista } from 'components/form';
import { EnumEstadoEdicion, EnumTipoEdicion } from 'lib/edicion';
import TipoDocumentoModel from 'models/tipo_documento_model'
import EmpleadoModel from 'models/empleado_model'
import PersonaModel from 'models/persona_model'
import EmpresaModel from 'models/empresa_model'
import DocumentoModel from 'models/documento_model'
import AxDocumento from 'modulos/documento/ax_documento';

const fetcherVDocumento = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());
const fetcherTipoDocumento = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());
const fetcherPersona = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());
const fetcherEmpresa = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());
const fetcherEmpleado = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());

const campos = [
  { name: 'Documento' },
  { name: 'N° Documento' },
  { name: 'Fecha Documento' },
  { name: 'Empleado' },
  { name: 'Ciudadano' },
  { name: 'Observaciones' },
  { name: 'Fecha Registro' },
  { name: '¿Anulado?' },
]

type TypeFiltro = {
  numero_documento: string,
  id_persona: number,
  fecha_documento: string,
  id_tipo_documento: number[]
}

export default function AxPageDocumento() {
  const { data: listaTipoDocumento } = useSWRImmutable<any[]>('/api/documento/tipo_documento', fetcherTipoDocumento);
  const { data: listaPersona } = useSWRImmutable('/api/entidad/persona', fetcherPersona);
  const { data: listaDoc } = useSWRImmutable('/api/documento/documento/v_documento', fetcherVDocumento);
  const { data: listaEmpresa } = useSWRImmutable('/api/entidad/empresa', fetcherEmpresa);
  const { data: listaEmpleado } = useSWRImmutable('/api/entidad/empleado', fetcherEmpleado);
  const [ID, setID] = useState(-1)
  const [lista, setLista] = useState<DocumentoModel[]>([]);
  const [estadoEdicion, setEstadoEdicion] = useState(EnumEstadoEdicion.LISTAR)
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState<TypeFiltro>({ numero_documento: "", id_persona: 0, fecha_documento: "", id_tipo_documento: [] });
  const [listaFiltro, setListaFiltro] = useState<DocumentoModel[]>([]);
  const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
  const [esModalOpen, setEsModalOpen] = useState(false)
  const [paginacion, setPaginacion] = useState({ inicio: 0, cantidad: 10 })

  useEffect(() => {
    if (estadoEdicion != EnumEstadoEdicion.LISTAR && estadoEdicion != EnumEstadoEdicion.GUARDADO) return;
    setIsLoading(true)
    const fetchData = async () => {
      const response = await fetch(`/api/documento/documento?inicio=${paginacion.inicio}&cantidad=${paginacion.cantidad}`, {
        method: "GET"
      })
      const result: DocumentoModel[] = await response.json()
      setLista([...lista, ...result]);
      setIsLoading(false)
    }
    fetchData().catch(console.error);
  }, [estadoEdicion, paginacion])

  useEffect(() => {
    FnFiltrarLista();
  }, [lista])

  const resultado = Array.from(new Set(lista.map(s => s.id_tipo_documento)))
    .map(id => {
      return {
        id: id
      }
    });

  const handleChange = (event: any) => {
    if (event.target.name == "FiltroGrupo") {
      const indexAnterior = filtro.id_tipo_documento.indexOf(event.target.value);
      if (indexAnterior != -1) filtro.id_tipo_documento.splice(indexAnterior, 1);
      else filtro.id_tipo_documento.push(event.target.value);
      setFiltro({ ...filtro });
    }
    else {
      setFiltro({ ...filtro, [event.target.name]: event.target.value });
    }
  }

  function FnFiltrarLista() {
    let filtrado = listaDoc && listaDoc.filter((doc: any) =>
      (filtro.id_tipo_documento.indexOf(doc.id_tipo_documento) != -1) &&
      (filtro.id_persona ? doc.id_persona == filtro.id_persona : true) &&
      (filtro.numero_documento ? doc.numero_documento == filtro.numero_documento : true) &&
      (filtro.fecha_documento ? doc.fecha_documento == filtro.fecha_documento : true)
    )
    console.log(filtrado);
    setListaFiltro(filtrado);
  }

  function FnLoadMas() {
    setPaginacion({ inicio: 0, cantidad: paginacion.cantidad + 10 });
  }

  return (
    <>
      <main className="flex-1 pb-8">
        <div className={(isLoading ? "animate-pulse" : "") + " bg-white shadow"}>
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
                <div className="mt-2 grid ml-14 grid-cols-1   gap-y-6 gap-x-4 md:grid-cols-6">
                  <div className="md:col-span-2">
                    <AxSelectFiltro name="id_persona" value={filtro.id_persona} filtro={true} label="Ciudadanos" handleChange={handleChange}>
                      {listaPersona && listaPersona.map((ciudadano: any) => <option key={ciudadano.id} value={ciudadano.id}>{ciudadano.nombre}</option>)}
                    </AxSelectFiltro>
                  </div>
                  <div className="md:col-span-1">
                    <AxInput name="numero_documento" handleChange={handleChange} label="Nro Documento" type="text" filtro={true} />
                  </div>
                  <div className="md:col-span-1">
                    <AxInput name="fecha_documento" label="Fec Documento" handleChange={handleChange} filtro={true} type="date" />
                  </div>
                  <div className="md:col-span-2">
                    <button type="button"
                      onClick={() => FnFiltrarLista()}
                      className="ml-3 h-8 mt-0 w-20 bottom-0 right-0  inline-flex items-center px-3 py-2 border 
                                            border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                            disabled:bg-blue-300"
                    >
                      Filtrar
                      <RefreshIcon className='h-5 w-5 text-transparent'></RefreshIcon>
                    </button>
                    <button type="button"
                      onClick={() => FnLoadMas()
                      }
                      className="ml-3 bg-green-500 mr-2 h-8 mt-0 w-32 bottom-0 right-0  inline-flex items-center px-3 py-2 border 
                                            border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                            disabled:bg-green-300"
                    >
                      Cargas Mas
                      <RefreshIcon className='h-4 w-4 mr-1'></RefreshIcon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="max-w-6xl mx-16 px-2 sm:px-2 ">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Documentos</h2>
            <div className="mt-2 grid  gap-5 grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5">
              {/* Card */}
              {(listaTipoDocumento && listaTipoDocumento.map((item: any) =>
              (resultado.map(s => s.id == item.id &&
                < ul key={item.id} className="bg-indigo-400 overflow-hidden shadow rounded-lg hover:bg-indigo-700"
                  onClick={() => {
                    handleChange({ target: { name: "FiltroGrupo", value: item.id } });
                    FnFiltrarLista();
                  }}>

                  <div className={(filtro.id_tipo_documento.indexOf(item.id) != -1 ? "bg-indigo-600" : "bg-indigo-400") + " p-2"}>
                    <div className="flex items-center">
                      <div className="ml-2 w-10 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-white truncate uppercase">{item.nombre}</dt>
                          {/* <dd>
                            <div className="text-sm font-medium text-indigo-100">{item.Descripcion}</div>
                          </dd> */}
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
              <AxBtnEditarLista estadoEdicion={ID > 0 ? EnumEstadoEdicion.SELECCIONADO : estadoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion} />
              <AxBtnAgregar setEstadoEdicion={setEstadoEdicion} setID={setID} setTipoEdicion={setTipoEdicion}></AxBtnAgregar>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="mx-auto px-14 sm:px-16 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg ">
                  {filtro.id_tipo_documento.length == 0 ?
                    <dd className="mt-10 gap-2 p-10 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                      <ExclamationCircleIcon

                        className="flex-shrink-0 mr-0 h-5 w-5 text-orange-500"
                        aria-hidden="true"
                      />
                      ¡Seleccionar un Documento!
                    </dd> :
                    <table className="flex flex-col w-full h-[calc(100vh-23rem)] divide-gray-300">
                      <thead className='bg-indigo-200'>
                        <tr className='table table-fixed w-full divide-x divide-y divide-gray-200'>
                          <th scope="col" className="relative w-16 px-3">
                            ✔
                          </th>
                          {campos.map((item) => (
                            <th key={item.name} className="px-1 py-3 text-center text-sm text-gray-900">
                              {item.name}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-x divide-y overflow-x-auto overflow-y-auto divide-gray-200 bg-white">
                        {(listaFiltro && listaFiltro.map((item: any) => (
                          <tr key={item.id} className={item.id == ID ? "bg-indigo-100 table table-fixed w-full" : "bg-white table table-fixed w-full"}>
                            <td className="w-16 text-center whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                              <input
                                onChange={(event) => {
                                  if (!event.target.checked) {
                                    setID(-1);
                                    setEstadoEdicion(EnumEstadoEdicion.CANCELADO)
                                  }
                                  else {
                                    setID(item.id);
                                    setEstadoEdicion(EnumEstadoEdicion.SELECCIONADO)
                                  }
                                }}
                                checked={item.id == ID}
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                            </td>
                            <td className="px-1 py-3 whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.tipo_documento_nombre}
                            </td>
                            <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.numero_documento}
                            </td>
                            <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.fecha_documento}
                            </td>
                            <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.empleado_nombre}
                            </td>
                            <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.persona_nombre}
                            </td>
                            <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.observacion}
                            </td>
                            <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.fecha_creacion}
                            </td>
                            <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                              {item.es_anulado == true ?

                                <BanIcon className='h-6 w-6    text-red-400'></BanIcon> :
                                <BadgeCheckIcon className='h-6 w-6  text-green-400 '></BadgeCheckIcon>
                              }
                            </td>
                          </tr>
                        )))}
                      </tbody>
                    </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >

      <Transition.Root show={estadoEdicion == EnumEstadoEdicion.EDITANDO} as={Fragment}>

        <Dialog as="div" className="relative z-10 " onClose={setEsModalOpen}>
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
                      <Dialog.Title className="text-lg font-medium text-gray-900"> Registro de Documento [{tipoEdicion}]</Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setEstadoEdicion(EnumEstadoEdicion.CANCELADO)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <AxDocumento ID={ID} setID={setID} setEstadoEdicion={setEstadoEdicion} tipoEdicion={tipoEdicion}></AxDocumento>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}


