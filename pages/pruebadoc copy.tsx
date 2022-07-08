
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import DocumentoModel from 'models/documento-model'
import RegistroDocumentoModel from 'models/registro-documento-model'
import useSWRImmutable from "swr/immutable"
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from '@heroicons/react/solid'
import { Console } from 'console'

const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
]

const fetcherDoc = (url: string): Promise<any> =>
  fetch(url, { method: "GET" }).then(r => r.json());

export default function Example() {
  const { data: listaDoc } = useSWRImmutable('/api/documento/edicion', fetcherDoc);
  const [listaNueva, setListaNueva] = useState<DocumentoModel[]>([]);
  const [listaRegistroDocumento, setListaRegistroDocumento] = useState<RegistroDocumentoModel[]>([]);
  const [idFiltro, setIdFiltro] = useState(false)

  const [lista, setLista] = useState([]);

  useEffect(() => {


    const fetchData = async () => {
      const response = await fetch(`/api/registro-documento/edicion`, {
        method: "GET"
      })
      const result: RegistroDocumentoModel[] = await response.json()
      setListaRegistroDocumento(result);
    }
    fetchData().catch(console.error);


  }, [])

  const resultado = Array.from(new Set(listaRegistroDocumento.map(s => s.IDDocumento)))
    .map(id => { 
      return  {
      id: id
    }
    
    });

 
  return (
    <>
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {(listaDoc && listaDoc.map((item: any) =>
              
              (resultado[0].id == "/documento/" + item.ID &&
                < div key={item.ID} className="bg-white overflow-hidden shadow rounded-lg" >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-18 text-white  font-medium rounded-l-md text-lg font-serif bg-indigo-500 h-16"
                      >
                        {item.Codigo}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{item.Nombre}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{item.Descripcion}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    {/* <div className="text-sm">
                      <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                        View all
                      </a>
                    </div> */}
                  </div>
                </div>
               ))
              )
              
              }
            </div>
          </div>


          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Recent activity
          </h2>

          {/* Activity list (smallest breakpoint only) */}


          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listaRegistroDocumento && listaRegistroDocumento.map((item) => (
                        <tr key={item.ID} className="bg-white">
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

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}


