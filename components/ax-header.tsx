import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

import AxNotification from 'components/icons/ax-notification'

const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    role: 'Human Resources Manager',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Inicio', href: '#', current: false },
    { name: 'Paquetes', href: '#', current: true },
    { name: 'Trabajadores', href: '#', current: false },
    { name: 'Resultados', href: '#', current: false }
]
const userNavigation = [
    { name: 'Tu Perfil', href: '#' },
    { name: 'Ajustes', href: '#' },
    { name: 'Cerrar Sesión', href: '#' },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function AxHeader() {
    return (<>
        <header className="bg-blue-600 shadow bg-gradient-to-r from-blue-700 to-blue-500">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <Popover className="flex justify-between h-16">
                    <div className="flex px-2 lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/">
                                <img className="h-10 w-auto" src="/logo-text-blanco.svg" alt="Workflow" />
                            </a>
                        </div>
                        <nav aria-label="Global" className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className={classNames(item.current ? "bg-blue-500" : "", "px-3 py-2 text-white text-sm font-medium rounded-md hover:bg-blue-700")}>
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <Transition.Root as={Fragment}>
                        <div className="lg:hidden">
                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
                            </Transition.Child>

                            <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-150 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Popover.Panel focus className="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top">
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                                        <div className="pt-3 pb-2">
                                            <div className="flex items-center justify-between px-4">
                                                <div>
                                                    <img className="h-10 w-auto" src="/logo-text.svg" alt="Workflow" />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                                        <span className="sr-only">Close menu</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-3 px-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href}
                                                        className={classNames(item.current ? "bg-blue-100" : "", "block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800")}>
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition.Child>
                        </div>
                    </Transition.Root>
                    <div className="ml-4 flex items-center">
                        < Popover.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-blue-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" >
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        </Popover.Button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-4 relative flex-shrink-0">
                            <div>
                                <Menu.Button className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-blue-600 lg:p-2">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <span className="ml-3 text-blue-50 text-sm font-medium block">
                                        <span className="sr-only">Open user menu for </span>Emilia Birch
                                    </span>
                                    <ChevronDownIcon
                                        className="flex-shrink-0 ml-1 h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            <a href={item.href} className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100'>
                                                {item.name}
                                            </a>
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>

                    </div>
                </Popover>
            </div>
        </header>
    </>
    )
}
