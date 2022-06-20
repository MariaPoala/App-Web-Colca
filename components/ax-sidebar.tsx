import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentReportIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
    { name: 'Inicio', href: '/', icon: HomeIcon, current: true },
    { name: 'Empleado', href: '/empleado', icon: DocumentReportIcon, current: false },
    { name: 'Ciudadano', href: '/ciudadano', icon: DocumentReportIcon, current: false },
    { name: 'Archivos', href: '/subirarchivo', icon: DocumentReportIcon, current: false },
    // { name: 'History', href: '#', icon: ClockIcon, current: false },
    // { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
    // { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
    // { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
    // { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
]

const secondaryNavigation = [
    { name: 'Tu Perfil', href: '/miperfil', icon: CogIcon },
    // { name: 'Ayuda', href: '#', icon: QuestionMarkCircleIcon },
    // { name: 'Privacidad', href: '#', icon: ShieldCheckIcon },
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
            <div className="flex flex-col flex-grow bg-blue-600 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img className="h-12 w-auto" src="/logo.svg" alt="Easywire logo" />
                    <h1 className='text-zinc-50'>MUNICIPALIDAD DISTRITAL DE COLCA</h1>
                </div>
                <nav className="mt-5 flex-1 flex flex-col divide-y divide-blue-500 overflow-y-auto" aria-label="Sidebar">
                    <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <a
                                    href={item.href}
                                    className={classNames(
                                        router.pathname == item.href
                                            ? 'bg-blue-800 text-white'
                                            : 'text-blue-100',
                                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-500'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-blue-200" aria-hidden="true" />
                                    {item.name}
                                </a>
                            </Link>
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
                                                ? 'bg-blue-800 text-white'
                                                : 'text-blue-100',
                                            "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-blue-100  hover:text-white hover:bg-blue-500")}
                                    >
                                        <item.icon className="mr-4 h-6 w-6 text-blue-200" aria-hidden="true" />
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        {
            <Transition.Root show={isSidebarOpen} as={Fragment}>
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
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-700">
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
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img className="h-12 w-auto" src="/logo.svg" alt="Easywire logo" />
                                </div>
                                <nav className="mt-5 flex-shrink-0 h-full divide-y divide-blue-800 overflow-y-auto" aria-label="Sidebar">
                                    <div className="px-2 space-y-1">

                                        {navigation.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        router.pathname == item.href
                                                            ? 'bg-blue-800 text-white'
                                                            : 'text-blue-100',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md hover:text-white hover:bg-blue-600'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-blue-200" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            </Link>
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
                                                                ? "bg-blue-800 text-white"
                                                                : "text-blue-100",
                                                            "group flex items-center px-2 py-2 text-base font-medium rounded-md  hover:text-white hover:bg-blue-600")}
                                                    >
                                                        <item.icon className="mr-4 h-6 w-6 text-blue-200" aria-hidden="true" />
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