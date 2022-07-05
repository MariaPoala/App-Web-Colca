import { Fragment } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import {
    CogIcon, FingerPrintIcon, DocumentReportIcon, XIcon,
    HomeIcon, UserIcon, UserGroupIcon, DocumentDuplicateIcon, OfficeBuildingIcon,
    CloudUploadIcon, DocumentTextIcon, DuplicateIcon, DatabaseIcon, CloudIcon,
    UsersIcon, BadgeCheckIcon, IdentificationIcon, LibraryIcon, ClipboardCheckIcon    
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AxBodyNavegacion from './ax-form/ax-body-navegacion'

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
            { name: 'Registro de Documento', href: '/registrodocumento', icon: CloudUploadIcon, current: false },
        ],
    },
    {
        name: 'seguimiento', href: '', icon: BadgeCheckIcon, current: false,
        children: [
            { name: 'seguimiento', href: '/segimiento', icon: BadgeCheckIcon, current: false },
        ],
    },
    {
        name: 'Reporte', href: '', icon: DocumentReportIcon, current: false,
        children: [
            { name: 'Reporte De Empleados', href: '/rol', icon: DocumentReportIcon },
            { name: 'Reporte De Ciudadanos', href: '#', icon: DocumentReportIcon, current: false },
            { name: 'Reporte De Documentos', href: '#', icon: DocumentReportIcon, current: false },
        ],
    },
]

const secondaryNavigation = [
    { name: 'Tu Perfil', href: '/miperfil', icon: CogIcon },
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
                    <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 lg:flex-grow-0 lg:ml-4">
                        <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg" alt="Tuple" />
                    </div>
                </div>                
               <AxBodyNavegacion clase="mt-5 flex-1 flex flex-col divide-y divide-indigo-500 overflow-y-auto"></AxBodyNavegacion>
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
                                <div className="mt-4 ml-8 flex flex-shrink-0 lg:flex-grow-0 lg:ml-4">
                                    <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg" alt="Tuple" />
                                </div>
                                <AxBodyNavegacion clase="mt-5 flex-shrink-0 h-full divide-y divide-indigo-800 overflow-y-auto"></AxBodyNavegacion>
                              
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