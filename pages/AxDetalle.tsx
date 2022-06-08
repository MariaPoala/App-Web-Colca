import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
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

import AxPersona from './AxPersona'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function AxDetalle({ idEmpleado }: any) {
    return <>
        <section
            aria-labelledby="message-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
        >
            {/* Top section */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
                {/* Toolbar*/}
                <div className="h-16 flex flex-col justify-center">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="py-3 flex justify-between">
                            {/* Left buttons */}
                            <div>
                                <div className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                                    <span className="inline-flex sm:shadow-sm">
                                        <button
                                            type="button"
                                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <ReplyIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Reply</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <PencilIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Note</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <UserAddIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Assign</span>
                                        </button>
                                    </span>

                                    <span className="hidden lg:flex space-x-3">
                                        <button
                                            type="button"
                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <ArchiveIconSolid className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Archive</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                        >
                                            <FolderDownloadIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Move</span>
                                        </button>
                                    </span>

                                    <Menu as="div" className="-ml-px relative block sm:shadow-sm lg:hidden">
                                        <div>
                                            <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3">
                                                <span className="sr-only sm:hidden">More</span>
                                                <span className="hidden sm:inline">More</span>
                                                <ChevronDownIcon
                                                    className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block sm:hidden px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Note
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block sm:hidden px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Assign
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Archive
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                Move
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>

                            {/* Right buttons */}
                            <nav aria-label="Pagination">
                                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    <a
                                        href="#"
                                        className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Message header */}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                {/* Thread section*/}
                <div className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
                    <AxPersona idEmpleado={idEmpleado}></AxPersona>
                </div>
            </div>
        </section>
    </>
}