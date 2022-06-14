import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ArchiveIcon as ArchiveIconSolid,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {
    ArchiveIcon as ArchiveIconOutline,
    BanIcon,
    BellIcon,
    FlagIcon,
    InboxIcon,
    MenuIcon,
    PencilAltIcon,
    UserCircleIcon,
    XIcon,
} from '@heroicons/react/outline'

import AxDetalle from './Empleado/AxDetalle'

const messages = [
    {
        id: 1,
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        id: 2,
        subject: 'Nemo mollitia repudiandae adipisci explicabo optio consequatur tempora ut nihil',
        sender: 'Virginia Abshire',
        href: '#',
        date: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const applications = [
    {
        applicant: {
            name: 'Ricardo Cooper',
            email: 'ricardo.cooper@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Kristen Ramos',
            email: 'kristen.ramos@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
    {
        applicant: {
            name: 'Ted Fox',
            email: 'ted.fox@example.com',
            imageUrl:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        date: '2020-01-07',
        dateFull: 'January 7, 2020',
        stage: 'Completed phone screening',
        href: '#',
    },
]

const fetcherEmpleado = (url: string, params: any): Promise<Array<any>> =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json());

export default function Example() {
    const [open, setOpen] = useState(false)
    const [idEmpleado, setIdEmpleado] = useState(null)
    const { data } = useSWRImmutable(['/api/empleado', {}], fetcherEmpleado)
 
    return (
        <>
            <div className="h-full flex flex-col">
                {/* Bottom section */}
                <div className="min-h-0 flex-1 flex overflow-hidden">
                    {/* Main area */}
                    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
                        <AxDetalle idEmpleado={idEmpleado}></AxDetalle>
                        {/* Message list*/}
                        <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
                            <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
                                <div className="flex-shrink-0">
                                    <div className="h-16 bg-white px-6 flex flex-col justify-center">
                                        <div className="flex items-baseline space-x-3">
                                            <h2 className="text-lg font-medium text-gray-900">Inbox</h2>
                                            <p className="text-sm font-medium text-gray-500">{messages.length} messages</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
                                        Sorted by date
                                    </div>
                                </div>
                                <nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {data && data.map((item) => (
                                                <li key={item.id}>
                                                    <a onClick={() => {
                                                        console.log(item.id)
                                                        setIdEmpleado(item.id)
                                                    }} className="block hover:bg-gray-50">
                                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                                            <div className="min-w-0 flex-1 flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <img className="h-12 w-12 rounded-full" src={item.ImgURL} alt="" />
                                                                </div>
                                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols md:gap-4">
                                                                    <div>
                                                                        <p className="text-sm font-medium text-indigo-600 truncate">{item.Nombres + ' ' + item.Apellidos}</p>
                                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                            <span className="truncate">{item.Email}</span>
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </>
    )
}
