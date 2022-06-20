import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { FilterIcon, XIcon } from '@heroicons/react/outline'

export default function Example() {
    const [open, setOpen] = useState(false)

    return (
            <Menu as="div" className="relative z-1 inline-block text-left">
                <div>

                    <Menu.Button className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                        <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true"

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
                    <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <a href=""
                                className='bg-gray-100 block px-4 py-2 text-sm font-medium text-gray-900'
                            >
                                maria
                            </a>
                            <a href=""
                                className='bg-gray-100 block px-4 py-2 text-sm font-medium text-gray-900'
                            >
                                maria
                            </a>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    )
}
