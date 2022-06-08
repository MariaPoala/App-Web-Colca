import { useState } from 'react'
import { EyeIcon } from '@heroicons/react/solid'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import useSWR from 'swr'
import Head from 'next/head'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const grupoColorClass: { [x: string]: string } = {
  LA: "bg-blue-400",
  RX: "bg-slate-500",
  EC: "bg-yellow-500",
  TM: "bg-green-500",
  RE: "bg-red-500",
  BI: "bg-indigo-500"
}

interface IRsptResultadoGrupo {
  ID: 'LA' | 'RX' | 'EC' | 'TM' | 'RE' | 'BP'
  Servicio: string
  Inicial: string
  Cantidad: number
  Email: string
}

interface IRsptResultadoRow {
  ID: number
  IDFormato: number
  Servicio: string
  Inicial: 'LA' | 'RX' | 'EC' | 'TM' | 'RE' | 'BP'
  Fecha_Str: string
  Hora_Str: string
  Fecha: Date
  Examen: string
  Importe: number
  Email: string
  RutaPDF: string
}

const fetcherResultadoGrupo = (url: string, params: any): Promise<Array<IRsptResultadoGrupo>> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json());

const fetcherResultadoRow = (url: string, params: any): Promise<Array<IRsptResultadoRow>> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json());

var iDate = new Date();
var fDate = new Date();
var fDay = fDate.getUTCDate().toString().padStart(2, '0');
var fMonth = (fDate.getUTCMonth() + 1).toString().padStart(2, '0');
var fYear = fDate.getUTCFullYear().toString();

iDate.setMonth(iDate.getMonth() - 1);
var iDay = iDate.getUTCDate().toString().padStart(2, '0');
var iMonth = (iDate.getUTCMonth() + 1).toString().padStart(2, '0');
var iYear = iDate.getUTCFullYear().toString();

const Filtro: { [x: string]: string | number } = {
  IDia: iDay,
  IMes: iMonth,
  IYear: iYear,
  FDia: fDay,
  FMes: fMonth,
  FYear: fYear,
  Pagina: 1
}

const URL_PDF = "https://storagecocloud.blob.core.windows.net/hce/PDF";

export default function AxpResultado() {
  const [seleccionGrupo, setSeleccionGrupo] = useState({ LA: false, RX: false, EC: false, TM: false, RE: false, BP: false });
  const [filtro, setFiltro] = useState(Filtro);
  const { data: resultadoGrupo } = useSWR(['/api/resultadogrupo', filtro], fetcherResultadoGrupo)
  const { data: resultadoRow } = useSWR(['/api/resultadopaciente', { ...filtro, Servicios: seleccionGrupo }], fetcherResultadoRow)

  function FnSetValueFecha(name: string, valueStr: string) {
    if (isNaN(new Date(valueStr).getDate())) return;
    const value = new Date(valueStr);
    var day = value.getUTCDate().toString().padStart(2, '0');
    var month = (value.getUTCMonth() + 1).toString().padStart(2, '0');
    var year = value.getUTCFullYear().toString();
    const filtroUI = { ...filtro };
    if (name == "INICIO") { filtroUI.IDia = day; filtroUI.IMes = month; filtroUI.IYear = year; }
    else { filtroUI.FDia = day; filtroUI.FMes = month; filtroUI.FYear = year; }
    setFiltro(filtroUI);
  }

  function FnTotalRows() {
    let totalRows = resultadoGrupo?.filter(x => seleccionGrupo[x.ID] == true).reduce((partialSum, item) => partialSum + item.Cantidad, 0);
    if (totalRows == 0) totalRows = resultadoGrupo?.reduce((partialSum, item) => partialSum + item.Cantidad, 0);
    return totalRows ? totalRows : 0;
  }

  return (
    <>
      <Head>
        <title>Resultados - Clínica Ortega</title>
      </Head>
      <div className="static">
        <div className="border-b relative border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Resultados Clínicos
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <div className="relative flex-auto border border-gray-300 rounded-md px-3 mr-2 py-2 pr-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="name" className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                Inicio
              </label>
              <input type="date" onKeyDown={(event) => { event.preventDefault(); return false }}
                onChange={event => FnSetValueFecha("INICIO", event.target.value)}
                defaultValue={`${Filtro.IYear}-${Filtro.IMes}-${Filtro.IDia}`}
                name="name" id="name" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" />
            </div>
            <div className="relative flex-auto border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="name" className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                Fin
              </label>
              <input type="date" onKeyDown={(event) => { event.preventDefault(); return false }}
                onChange={event => FnSetValueFecha("FIN", event.target.value)}
                defaultValue={`${Filtro.FYear}-${Filtro.FMes}-${Filtro.FDia}`}
                name="name" id="name" className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" />
            </div>
          </div>
        </div>
        {/* Pinned projects */}
        <div className="px-4 mt-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Examenes Auxiliares</h2>
          <ul role="list" className="grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mt-2">
            {resultadoGrupo && resultadoGrupo.map((aAux) => (
              <li key={aAux.ID} className="relative col-span-1 cursor-pointer flex shadow-sm rounded-md">
                <div
                  className={classNames(seleccionGrupo[aAux.ID] ? "bg-blue-100 rounded-md" : "", "flex-1 flex hover:bg-slate-200")}
                  onClick={() => {
                    setSeleccionGrupo({ ...seleccionGrupo, [aAux.ID]: !seleccionGrupo[aAux.ID] });
                    setFiltro({ ...filtro, Pagina: 1 });
                  }
                  }
                >
                  <div className={classNames(grupoColorClass[aAux.Inicial], 'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md')}>
                    {aAux.Inicial}
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <span className="text-gray-900 font-medium">{aAux.Servicio}</span>
                      <p className="text-gray-500">{aAux.Cantidad} resultados</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects table (small breakpoint and up) */}
        <div className="block mt-4">
          <div className="align-middle inline-block min-w-full border-b border-gray-200 mb-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th scope="col" className="px-6 py-3 border-b border-blue-200 bg-blue-100 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    <span className="lg:pl-2">Servicio</span>
                  </th>
                  <th className="px-6 py-3 border-b border-blue-200 bg-blue-100 text-left text-xs font-medium text-blue-600 uppercase tracking-wider" scope="col">
                    Fecha
                  </th>
                  <th scope="col" className="hidden md:table-cell px-6 py-3 border-b border-blue-200 bg-blue-100 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    <span className="lg:pl-2">Hora</span>
                  </th>
                  {/* <th scope="col" className="hidden md:table-cell px-6 py-3 border-b border-blue-200 bg-blue-100 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    <span className="lg:pl-2">Total</span>
                  </th> */}
                  <th className="pr-6 py-3 border-b border-blue-200 bg-blue-100 text-right md:text-center text-xs font-medium text-blue-600 uppercase tracking-wider" scope="col">
                    <span className="lg:pl-2">Resultado</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {resultadoRow && resultadoRow.map((iRow) => (
                  <tr key={iRow.ID}>
                    <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium md:hidden">
                      <div className="flex items-center space-x-3 lg:pl-2">
                        <div className={classNames(grupoColorClass[iRow.Inicial], 'flex-shrink-0 w-2.5 h-2.5 rounded-full')} aria-hidden="true" />
                        <div className="ml-4 truncate">
                          <div className="font-medium text-gray-900">{iRow.Examen}</div>
                          <div className="text-gray-500 font-normal">{iRow.Servicio}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium hidden md:table-cell text-gray-900">
                      <div className="flex items-center space-x-3 lg:pl-2">
                        <div className={classNames(grupoColorClass[iRow.Inicial], 'flex-shrink-0 w-2.5 h-2.5 rounded-full')} aria-hidden="true" />
                        <span className='truncate'>
                          {iRow.Examen} <span className="text-gray-500 font-normal"> ({iRow.Servicio})</span>
                        </span>
                      </div>
                    </td>
                    <td className="max-w-0 w-full whitespace-nowrap text-sm md:hidden">
                      <div className="flex items-center space-x-3 lg:pl-2">
                        <div className="ml-4">
                          <div className="text-gray-900">{iRow.Fecha_Str}</div>
                          <div className="text-gray-500">{iRow.Hora_Str}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {iRow.Fecha_Str}
                    </td>

                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {iRow.Hora_Str}
                    </td>
                    {/* <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {iRow.Importe}
                    </td> */}
                    <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <a href={URL_PDF + iRow.RutaPDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-blue-50 hover:bg-blue-100">
                        <EyeIcon className="h-5 w-5 mr-1 text-gray-400" aria-hidden="true" />
                        Visualizar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='fixed bottom-0 left-0 lg:left-64 right-0'>
          <nav
            className="bg-blue-100 py-1 flex items-center justify-between border-t border-blue-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">
                  {(Number(filtro.Pagina) == 1) ? (FnTotalRows() == 0 ? 0 : 1) : (Number(filtro.Pagina) - 1) * 15 + 1}
                </span> a <span className="font-medium">
                  {Number(filtro.Pagina) == 1 ? (FnTotalRows() < 15 ? FnTotalRows() : 15) : ((Number(filtro.Pagina)) * 15 > FnTotalRows()) ? FnTotalRows() : (Number(filtro.Pagina)) * 15}
                </span> de{' '}
                <span className="font-medium">
                  {FnTotalRows()}
                </span> resultados
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button onClick={() => {
                if (filtro.Pagina == 1) return;
                setFiltro({ ...filtro, Pagina: Number(filtro.Pagina) - 1 })
              }}
                disabled={Number(filtro.Pagina) == 1}
                className="disabled:text-slate-400 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Anterior
              </button>
              <button onClick={() => {
                if (Number(filtro.Pagina) * 15 >= (FnTotalRows() ? FnTotalRows() : 0)) return;
                setFiltro({ ...filtro, Pagina: Number(filtro.Pagina) + 1 })
              }}
                disabled={Number(filtro.Pagina) * 15 > FnTotalRows()}
                className="disabled:text-slate-400 ml-3 relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Siguiente
                <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </div>

          </nav>
        </div >

      </div >
    </>
  )
}

AxpResultado.RequireAuth = true;