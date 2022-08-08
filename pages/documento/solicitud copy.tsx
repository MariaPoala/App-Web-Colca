
import { Fragment, useEffect, useRef, useState } from 'react'
import useSWRImmutable from "swr/immutable"
import { CheckCircleIcon, LinkIcon, RefreshIcon, XIcon, ExclamationCircleIcon, EyeOffIcon, EyeIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { AxInput, AxSelectFiltro, AxBtnEditar, AxPagination, AxBtnAgregar, AxBtnEditarLista, AxSelect } from 'components/form';
import { EnumEstadoEdicion, EnumTipoEdicion } from 'lib/edicion';
import SolicitudModel from 'models/solicitud_model'
import AxSolicitud from 'modulos/documento/ax_solicitud';
import AxSolicitudEstado from 'modulos/documento/ax_solicitud_estado';
import AxSubirArchivo from 'modulos/documento/ax_subir_archivo';
import Link from 'next/link';
import supabase from "lib/supabase_config";
import PSPDFKit from 'pspdfkit';


const fetcherVSolicitud = (url: string): Promise<any> =>
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
  { name: 'Tipo Documento' },
  { name: 'N° Documento' },
  { name: 'Entidad' },
  { name: 'Documento' },
  { name: 'I Total' },
  { name: 'Empleado' },
  { name: 'Fecha Inicio' },
  { name: 'Fecha Plazo' },
  { name: 'Estado' },
  { name: 'Ver' },
  { name: 'Subir' },
]

type TypeFiltro = {
  numero_documento: string,
  id_persona: number,
  fecha_documento: string,
  id_tipo_documento: number[],
  id_empresa: 0,
  tipo_entidad: string
}

export default function AxPageDocumento() {
  const { data: listaTipoDocumento } = useSWRImmutable<any[]>('/api/documento/tipo_documento', fetcherTipoDocumento);
  const { data: listaPersona } = useSWRImmutable('/api/entidad/persona', fetcherPersona);
  const { data: listaSol } = useSWRImmutable('/api/documento/solicitud/v_solicitud', fetcherVSolicitud);
  const { data: listaEmpresa } = useSWRImmutable('/api/entidad/empresa', fetcherEmpresa);
  const { data: listaEmpleado } = useSWRImmutable('/api/entidad/empleado/v_empleado', fetcherEmpleado);
  const [ID, setID] = useState(-1)
  const [lista, setLista] = useState<SolicitudModel[]>([]);
  const [estadoEdicion, setEstadoEdicion] = useState(EnumEstadoEdicion.LISTAR)
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState<TypeFiltro>({ numero_documento: "", id_persona: 0, fecha_documento: "", id_tipo_documento: [], id_empresa: 0, tipo_entidad: "Natural" });
  const [listaFiltro, setListaFiltro] = useState<SolicitudModel[]>([]);
  const [tipoEdicion, setTipoEdicion] = useState(EnumTipoEdicion.VISUALIZAR)
  const [esModalOpen, setEsModalOpen] = useState(false)
  const [esModalEstado, setEsModalEstado] = useState(false)
  const [urlArchivo, setUrlArchivo] = useState("")
  const [archivo, setArchivo] = useState("")
  const [clic, setclic] = useState(false)
  const [subirNuevoArchivo, setSubirNuevoArchivo] = useState(false)
  const [modalArchivoSol, setModalArchivoSol] = useState(false)

  const [paginacion, setPaginacion] = useState({ inicio: 0, cantidad: 10 })

  useEffect(() => {
    if (estadoEdicion != EnumEstadoEdicion.LISTAR && estadoEdicion != EnumEstadoEdicion.GUARDADO) return;
    setIsLoading(true)
    const fetchData = async () => {
      const response = await fetch(`/api/documento/solicitud/v_solicitud?inicio=${paginacion.inicio}&cantidad=${paginacion.cantidad}`, {
        method: "GET"
      })
      const result: SolicitudModel[] = await response.json()
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
    let filtrado = listaSol && listaSol.filter((sol: any) =>
      (filtro.id_persona ? sol.id_persona == filtro.id_persona : true) ||
      (filtro.id_empresa ? sol.id_empresa == filtro.id_empresa : true)
    )
    setListaFiltro(filtrado);
  }

  function FnLoadMas() {
    setPaginacion({ inicio: 0, cantidad: paginacion.cantidad + 10 });
  }

  // const containerRef = useRef(null);
  // function FnFuncion() {
  //   let instance, PSPDFKit:any;
  //   (async function() {
  //     PSPDFKit = await import("pspdfkit");
  //     instance = await PSPDFKit.load({
  //       container: containerRef.current,
  //       document: archivo,
  //       baseUrl: `${window.location.protocol}//${window.location.host}/`
  //     });
  //   })();

  //   return () => PSPDFKit && PSPDFKit.unload(containerRef.current);
  // }

  async function FndescargarImg() {
    try {

      if (archivo) {

        const { signedURL, error } = await supabase.storage.from('archivo-documento').createSignedUrl(archivo, 60)
        if (error) {
          throw error
        }
        if (signedURL) {
          setUrlArchivo(signedURL)
        }
      }
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
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
                  <div className="md:col-span-1">
                    <AxSelect name="tipo_entidad" value={filtro.tipo_entidad} label="Tipo Entidad" handleChange={handleChange}>
                      <option key="Natural" value="Natural">Natural</option>
                      <option key="Juridico" value="Juridico">Juridico</option>
                    </AxSelect>
                  </div>
                  {filtro.tipo_entidad == "Natural" ? <div className="md:col-span-2">
                    <AxSelectFiltro name={"id_persona"} value={filtro.id_persona} filtro={true} label="Persona" handleChange={handleChange}>
                      {listaPersona && listaPersona.map((ciudadano: any) =>
                        <option key={ciudadano.id} value={ciudadano.id}>{ciudadano.nombre}</option>)}
                    </AxSelectFiltro>
                  </div> :

                    <div className="md:col-span-2">
                      <AxSelectFiltro name={"id_empresa"} value={filtro.id_empresa} filtro={true} label="Empresa" handleChange={handleChange}>
                        {listaEmpresa && listaEmpresa.map((empresa: any) =>
                          <option key={empresa.id} value={empresa.id}>{empresa.razon_social}</option>)}
                      </AxSelectFiltro>
                    </div>
                  }
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
          <div className="sm:flex sm:items-center px-16 mt-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Lista De</h1>
              <p className="mt-2 text-sm text-gray-700">
                Solicitudes
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <AxBtnEditarLista estadoEdicion={ID > 0 ? EnumEstadoEdicion.SELECCIONADO : estadoEdicion} setTipoEdicion={setTipoEdicion} setEstadoEdicion={setEstadoEdicion} />
              {/* {tipoEdicion==EnumTipoEdicion.EDITAR && setabrir(true)} */}
              <AxBtnAgregar setEstadoEdicion={setEstadoEdicion} setID={setID} setTipoEdicion={setTipoEdicion}></AxBtnAgregar>
            </div>
          </div>




          {/* <div ref={containerRef} style={{ height: "100vh"}}/> */}




          <div className="hidden sm:block">
            <div className="mx-auto px-14 sm:px-16 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg ">
                  {/* {filtro.id_tipo_documento.length == 0 ?
                    // <dd className="mt-10 gap-2 p-10 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                    //   <ExclamationCircleIcon
                    //     className="flex-shrink-0 mr-0 h-5 w-5 text-orange-500"
                    //     aria-hidden="true"
                    //   />
                    //   ¡Seleccionar un Documento!
                    // </dd> : */}
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
                      {(listaSol && listaSol.map((item: any) => (
                        <tr key={item.id} className={item.id == ID ? "bg-indigo-100 table table-fixed w-full" : "bg-white table table-fixed w-full"}>
                          <td className="w-16 text-center whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            <input
                              onChange={(event) => {
                                if (!event.target.checked) setID(-1);
                                else setID(item.id);
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
                            {item.persona_nombre}
                          </td>
                          <td className="px-1 py-3 whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.nombre_documento}
                          </td>
                          <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.i_total}
                          </td>
                          <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.empleado_nombre}
                          </td>
                          <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.fecha_inicio}
                          </td>
                          <td className="px-1 whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.fecha_plazo}
                          </td>
                          <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                            {/* {item.estado} */}
                            {item.estado == "Registrado" ?
                              <button type="button"
                                onClick={() => {
                                  setTipoEdicion(EnumTipoEdicion.EDITAR);
                                  setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                  setEsModalEstado(true)
                                  setID(item.id)
                                }}
                                className=" inline-flex items-center px-3 py-2 border     border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500     disabled:bg-indigo-300"
                              >
                                {item.estado}
                              </button> :
                              item.estado == "Validado" ?
                                <button type="button"
                                  onClick={() => {
                                    setTipoEdicion(EnumTipoEdicion.EDITAR);
                                    setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                    setEsModalEstado(true)
                                    setID(item.id)
                                  }}

                                  className=" inline-flex items-center px-3 py-2 border     border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500     disabled:bg-indigo-300"
                                >
                                  {item.estado}
                                </button> :
                                <button type="button"
                                  onClick={() => {
                                    setTipoEdicion(EnumTipoEdicion.EDITAR);
                                    setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                    setEsModalEstado(true)
                                    setID(item.id)
                                  }}

                                  className="inline-flex items-center px-3 py-2 border     border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500     disabled:bg-indigo-300"
                                >
                                  {item.estado}
                                </button>
                            }
                          </td>
                          <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">
                            {item.archivo &&
                              <button type="button"
                                onClick={() => {
                                  setArchivo(item.archivo)
                                  setID(item.id)
                                }}
                                className=" inline-flex items-center px-3 py-2 border     border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500     disabled:bg-indigo-300"
                              >
                                <LinkIcon className='h-4 w-4 text-white'></LinkIcon>
                              </button>
                            }

                          </td>
                          <td className="px-1 text-center whitespace-nowrap text-sm text-gray-500 truncate">

                            <button type="button"
                              onClick={() => {
                                // setArchivo(item.url_archivo_solicitud)
                              
                                setID(item.id)
                                setTipoEdicion(EnumTipoEdicion.EDITAR);
                                setEstadoEdicion(EnumEstadoEdicion.EDITANDO);
                                setSubirNuevoArchivo(true)
                              }}
                              className=" inline-flex items-center px-3 py-2 border     border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500     disabled:bg-indigo-300"
                            >
                              {item.url_archivo_solicitud ? "Ver" : "Subir"}
                            </button>


                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                  {/* } */}
                </div>
                <div className="container"></div>

                <div className="md:col-span-1">
                  <div className=" sm:border-t sm:border-gray-200 sm:pt-5">
                    {clic == false ?
                      <button type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500     disabled:bg-green-300"
                        onClick={() => {
                          FndescargarImg()
                          setclic(true)
                        }}
                      >
                        <EyeIcon className="h-8 w-8 text-white "> </EyeIcon>
                        Visualizar Archivo
                      </button>
                      :
                      <button type="button"
                        className="ml-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300     disabled:bg-red-300"
                        onClick={() => {
                          setclic(false)
                        }}
                      >
                        <EyeOffIcon className="h-8 w-8 text-white "></EyeOffIcon>
                        Ocultar Archivo
                      </button>
                    }
                  </div>
                </div>
                <div className="md:col-span-6">
                  {clic == true &&
                    <div className="bg-white">
                      {urlArchivo ? (
                        <div className="">
                          <ul role="list" className="content-start sm:grid sm:grid-cols-1 sm:gap-x-1 sm:gap-y-1 sm:space-y-0 lg:grid-cols-1 lg:gap-x-1">
                            <li key={urlArchivo}>
                              <img className="lg:ml-20 md:ml:2 object-cover shadow-lg rounded-lg" src={urlArchivo} alt="" />
                            </li>
                          </ul>
                        </div>)
                        :
                        (
                          <div className="archivo-requisito no-image" style={{ height: 100, width: 100 }} />
                        )}

                    </div>
                  }
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
                      <Dialog.Title className="text-lg font-medium text-gray-900"> Registro de Solicitud [{tipoEdicion}]</Dialog.Title>
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
                  {esModalEstado == true ?
                    <AxSolicitudEstado ID={ID} setID={setID} setEstadoEdicion={setEstadoEdicion} tipoEdicion={tipoEdicion}></AxSolicitudEstado>
                    :
                    subirNuevoArchivo == true ?
                      <AxSubirArchivo ID={ID} setID={setID} setEstadoEdicion={setEstadoEdicion} tipoEdicion={tipoEdicion}></AxSubirArchivo>
                      :
                      <AxSolicitud ID={ID} setID={setID} setEstadoEdicion={setEstadoEdicion} tipoEdicion={tipoEdicion}></AxSolicitud>


                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}


