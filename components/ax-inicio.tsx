import { PlusIcon, UserAddIcon } from "@heroicons/react/outline"

export default function AxInicio({ nombre, icon }: any) {
  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Workflow</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{"Formulario de " + nombre}</p>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{nombre + " No Seleccionado"}</h1>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {"Para agregar un nuevo " + nombre}
              <p>  hacer clic en  <button type="button" className="bg-indigo-200 p-1 rounded-full text-indigo-500  ">
                <span className="sr-only ">{"Agregar " + nombre}</span>
                {(nombre!="Empleado")?<PlusIcon className="h-5 w-5 border-solid " aria-hidden="true" />:
                <UserAddIcon className="h-5 w-5 border-solid " aria-hidden="true" />}
                
              </button> </p>
            </a>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Para la edición hacer clic en
              <p>{"uno de los " + nombre + "s"}</p>
            </a>
          </nav>
        </footer>
      </div>
    </>
  )
}
