/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, PlusIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function AxInicioEmpleado() {
    return (
        <div className="relative overflow-hidden">
            <main>
                <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-0 lg:pb-0 lg:overflow-hidden">
                    <div className="mx-auto max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                                <div className="lg:py-24">
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                        <span className="block text-indigo-400">Administración De Empleados</span>
                                    </h1>
                                    <div className="relative mt-20">
                                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="max-w-4xl mx-auto">
                                                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                                    <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Empleados Activos</dt>
                                                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">100</dd>
                                                    </div>
                                                    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Empleados Inactivos</dt>
                                                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">247</dd>
                                                    </div>
                                                    <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                                        <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Total de Empleados</dt>
                                                        <dd className="order-1 text-5xl font-extrabold text-indigo-600">1000</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center ">
                                        
                                        <div className="mt-14">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                Nuevo Empleado
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                                    <img
                                        className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                        src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More main page content here... */}
            </main>
        </div>
    )
}
