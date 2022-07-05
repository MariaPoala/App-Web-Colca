import { Fragment } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import {
    CogIcon, FingerPrintIcon, SortAscendingIcon, DocumentReportIcon, XIcon,
    HomeIcon, UserIcon, UserGroupIcon, DocumentDuplicateIcon, OfficeBuildingIcon,
    CubeTransparentIcon, DocumentTextIcon, DuplicateIcon, DatabaseIcon, CloudIcon,
    UsersIcon, BadgeCheckIcon, IdentificationIcon, LibraryIcon, ClipboardCheckIcon,
    DocumentAddIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { start } from 'repl'

const navigation = [
    { name: 'Inicio', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Seguridad', href: '', icon: FingerPrintIcon, current: false,
        children: [
            { name: 'Roles', href: '/rol', icon: IdentificationIcon, current: false }
        ],
    },
    {
        name: 'Entidades', href: '', icon: UserGroupIcon, current: false,
        children: [
            { name: 'Distrito', href: '/distrito', icon: OfficeBuildingIcon, current: false },
            { name: 'Empleado', href: '/empleado', icon: UserIcon, current: false },
            { name: 'Ciudadano', href: '/ciudadano', icon: UsersIcon, current: false }
        ],
    },
    {
        name: 'Configuración', href: '', icon: DatabaseIcon, current: false,
        children: [
            { name: 'Grupo', href: '/grupo', icon: DuplicateIcon, current: false },
            { name: 'Consideraciones', href: '/consideracion', icon: DocumentTextIcon, current: false },
            { name: 'Tipo Documento', href: '/tipo-documento', icon: DocumentDuplicateIcon, current: false },
            { name: 'Area', href: '/area', icon: LibraryIcon, current: false },
            { name: 'Requisitos', href: '/requisito', icon: ClipboardCheckIcon, current: false }
        ],
    },
    {
        name: 'Digitalización', href: '', icon: CloudIcon, current: false,
        children: [
            { name: 'Registro de Documento', href: '/registrodocumento',  icon: DocumentAddIcon, current: false },
        ],
    },
    {
        name: 'seguimiento', href: '', icon: BadgeCheckIcon, current: false,
        children: [
            { name: 'seguimiento', href: '/segimiento',  icon: BadgeCheckIcon, current: false  },
        ],
    },
    {
        name: 'Reporte', href: '', icon: DocumentReportIcon, current: false,
        children: [
            { name: 'Reporte De Empleados', href: '/rol', icon: DocumentReportIcon },
            { name: 'Reporte De Ciudadanos', href: '#' , icon: DocumentReportIcon, current: false },
            { name: 'Reporte De Documentos', href: '#',  icon: DocumentReportIcon, current: false  },
        ],
    },
]

const secondaryNavigation = [
    { name: 'Tu Perfil', href: '/miperfil', icon: CogIcon },
    { name: 'Prueba', href: '/subirarchivo', icon: CogIcon, current: false },
]

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

interface IProps {
    isSidebarOpen: boolean,
    setIsSidebarOpen: (active: boolean) => void;
}

export default function AxSidebar({ isSidebarOpen, setIsSidebarOpen }: IProps) {
    const router = useRouter();
    return <>
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-grow bg-indigo-600 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    {/* <img className="h-12 w-auto" src="/logo.svg" alt="Easywire logo" />
                    <h1 className='text-zinc-50'>MUNICIPALIDAD DISTRITAL DE COLCA</h1> */}
                    <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
                        <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg" alt="Tuple" />
                    </div>
                </div>
                <nav className="mt-5 flex-1 flex flex-col divide-y divide-indigo-500 overflow-y-auto" aria-label="Sidebar">
                    <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                            !item.children ? (
                                <Link key={item.name} href={item.href}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            router.pathname == item.href
                                                ? 'bg-indigo-800 text-white'
                                                : 'text-indigo-100 hover:bg-indigo-500',
                                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-indigo-500  focus:ring-indigo-500'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-200" aria-hidden="true" />
                                        {item.name}
                                    </a>
                                </Link>
                            ) : (
                                <Disclosure as="div" key={item.name} className="space-y-1">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-indigo-800 text-white'
                                                        : 'text-indigo-100 hover:bg-indigo-500 ',
                                                    'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-indigo-800'
                                                )}
                                            >
                                                <item.icon
                                                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-200 "
                                                    aria-hidden="true"
                                                />
                                                <span className="flex-1">{item.name}</span>
                                                <svg
                                                    className={classNames(
                                                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                                    )}
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                </svg>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-1">
                                                {item.children.map((subItem) => (
                                                    <Link key={subItem.name} href={subItem.href}>
                                                        <Disclosure.Button
                                                            key={subItem.name}
                                                            as="a"
                                                            href={subItem.href}
                                                            className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
                                                        >
                                                            <subItem.icon className="mr-4 flex-shrink-0 h-5 w-5 text-indigo-200" aria-hidden="true"></subItem.icon>
                                                            {subItem.name}
                                                        </Disclosure.Button>

                                                    </Link>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            )
                        ))}
                    </div>
                    <div className="mt-6 pt-6">
                        <div className="px-2 space-y-1">
                            {secondaryNavigation.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            router.pathname == item.href
                                                ? 'bg-indigo-800 text-white'
                                                : 'text-indigo-100',
                                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100  hover:text-white hover:bg-indigo-500")}
                                    >
                                        <item.icon className="mr-4 h-6 w-6 text-indigo-200" aria-hidden="true" />
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div >
        {
            < Transition.Root show={isSidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setIsSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Cerrar sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
                                    <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg" alt="Tuple" />
                                </div>
                                <nav className="mt-5 flex-shrink-0 h-full divide-y divide-indigo-800 overflow-y-auto" aria-label="Sidebar">
                                    <div className="px-2 space-y-1">

                                        {navigation.map((item) => (
                                            !item.children ? (
                                                <Link key={item.name} href={item.href}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            router.pathname == item.href
                                                                ? 'bg-indigo-800 text-white'
                                                                : 'text-indigo-100',
                                                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-indigo-500'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-200" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ) : (
                                                <Disclosure as="div" key={item.name} className="space-y-1">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={classNames(
                                                                    router.pathname == item.href
                                                                        ? 'bg-indigo-800 text-white'
                                                                        : 'text-indigo-100 ',
                                                                    'group w-full  pl-2 pr-1  text-left  focus:outline-none focus:ring-2  focus:ring-indigo-500  group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-indigo-500'
                                                                )}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                <item.icon
                                                                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-200 group-hover:text-indigo-200"
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="flex-1">{item.name}</span>
                                                                <svg
                                                                    className={classNames(
                                                                        open ? 'text-indigo-500 rotate-90' : 'text-indigo-400',
                                                                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-indigo-400 transition-colors ease-in-out duration-150'
                                                                    )}
                                                                    viewBox="0 0 20 20"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                                </svg>
                                                            </Disclosure.Button>

                                                            <Disclosure.Panel className="space-y-1">
                                                                {item.children.map((subItem) => (
                                                                    <Link key={subItem.name} href={subItem.href}>
                                                                        <Disclosure.Button
                                                                            key={subItem.name}
                                                                            as="a"
                                                                            href={subItem.href}
                                                                            className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                                                        >
                                                                            {subItem.name}
                                                                        </Disclosure.Button>
                                                                    </Link>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )
                                        ))}

                                    </div>
                                    <div className="mt-6 pt-6">
                                        <div className="px-2 space-y-1">
                                            {secondaryNavigation.map((item) => (
                                                <Link key={item.name} href={item.href}>
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            router.pathname == item.href
                                                                ? "bg-indigo-800 text-white"
                                                                : "text-indigo-100",
                                                            "group flex items-center px-2 py-2 text-base font-medium rounded-md  hover:text-white hover:bg-indigo-600")}
                                                    >
                                                        <item.icon className="mr-4 h-6 w-6 text-indigo-200" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >
        }
    </>
}