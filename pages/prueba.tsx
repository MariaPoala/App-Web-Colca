/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
*/
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
  CheckIcon,
  FlagIcon,
  HeartIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  UserCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import useSWRImmutable from 'swr/immutable'
const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]
const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: BanIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
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
  },
  {
    id: 3,
    subject: 'Doloremque reprehenderit et harum quas explicabo nulla architecto dicta voluptatibus',
    sender: 'Kyle Gulgowski',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 4,
    subject: 'Eos sequi et aut ex impedit',
    sender: 'Hattie Haag',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 5,
    subject: 'Quisquam veniam explicabo',
    sender: 'Wilma Glover',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 6,
    subject: 'Est ratione molestiae modi maiores consequatur eligendi et excepturi magni',
    sender: 'Dolores Morissette',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 7,
    subject: 'Commodi deserunt aut veniam rem ipsam',
    sender: 'Guadalupe Walsh',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 8,
    subject: 'Illo illum aut debitis earum',
    sender: 'Jasmine Hansen',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 9,
    subject: 'Qui dolore iste ut est cumque sed',
    sender: 'Ian Volkman',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 10,
    subject: 'Aut sed aut illum delectus maiores laboriosam ex',
    sender: 'Rafael Klocko',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
]
const message = {
  subject: 'Re: New pricing for existing customers',
  sender: 'joearmstrong@example.com',
  status: 'Open',
  items: [
    {
      id: 1,
      author: 'Joe Armstrong',
      date: 'Yesterday at 7:24am',
      datetime: '2021-01-28T19:24',
      body: "<p>Thanks so much! Can't wait to try it out.</p>",
    },
    {
      id: 2,
      author: 'Monica White',
      date: 'Wednesday at 4:35pm',
      datetime: '2021-01-27T16:35',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p><strong style="font-weight: 600;">Monica White</strong><br/>Customer Service</p>
      `,
    },
    {
      id: 3,
      author: 'Joe Armstrong',
      date: 'Wednesday at 4:09pm',
      datetime: '2021-01-27T16:09',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
    },
  ],
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const fetcherEmpleado = (url: string, params: any): Promise<Array<any>> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json());

export default function Example() {
  const [open, setOpen] = useState(false)
  const { data } = useSWRImmutable(['/api/empleado', {}], fetcherEmpleado)
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-96">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto bg-white p-8">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
                            <img
                              src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                              alt=""
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-4 flex items-start justify-between">
                            <div>
                              <h2 className="text-lg font-medium text-gray-900">
                                <span className="sr-only">Details for </span>IMG_4985.HEIC
                              </h2>
                              <p className="text-sm font-medium text-gray-500">3.9 MB</p>
                            </div>
                            <button
                              type="button"
                              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <HeartIcon className="h-6 w-6" aria-hidden="true" />
                              <span className="sr-only">Favorite</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Information</h3>
                          <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Uploaded by</dt>
                              <dd className="text-gray-900">Marie Culver</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Created</dt>
                              <dd className="text-gray-900">June 8, 2020</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Last modified</dt>
                              <dd className="text-gray-900">June 8, 2020</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Dimensions</dt>
                              <dd className="text-gray-900">4032 x 3024</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Resolution</dt>
                              <dd className="text-gray-900">72 x 72</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Description</h3>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm italic text-gray-500">Add a description to this image.</p>
                            <button
                              type="button"
                              className="-mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <PencilIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="sr-only">Add description</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Shared with</h3>
                          <ul role="list" className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <img
                                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                                <p className="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
                              </div>
                              <button
                                type="button"
                                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Remove<span className="sr-only"> Aimee Douglas</span>
                              </button>
                            </li>
                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <img
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                  className="h-8 w-8 rounded-full"
                                />
                                <p className="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
                              </div>
                              <button
                                type="button"
                                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Remove<span className="sr-only"> Andrea McMillan</span>
                              </button>
                            </li>
                            <li className="flex items-center justify-between py-2">
                              <button
                                type="button"
                                className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">

                                </span>
                                <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                  Share
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Download
                          </button>
                          <button
                            type="button"
                            className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex flex-col">
        {/* Bottom section */}
        <div className="min-h-0 flex-1 flex ">
          {/* Narrow sidebar*/}
          {/* Main area */}
          <main className="min-w-0 flex-1 border-t border-gray-200 flex ">
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
              {/* cambio */}
              <div className="divide-y divide-gray-200">
                <div className="pb-6">
                  <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                  <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                    <div>
                      <div className="-m-1 flex">
                        <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="bg-indigo-300 text-white h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:ml-6 sm:flex-1">
                      <div>
                        <div className="flex items-center">
                          {/* <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{data ? data.Nombres + " " + data.Apellidos : ""}</h3> */}
                          <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                            <span className="sr-only">Online</span>
                          </span>
                        </div>
                        {/* <p className="text-sm text-gray-500">{data ? data.Email : ""}</p> */}
                      </div>
                      <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">

                        <button
                          type="button"
                          className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Enviar mensaje
                        </button>

                        <button
                          type="button"
                          className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Llamar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 sm:px-0 sm:py-0">
                  <div className="p-4 md:p-6">
                    <form className="space-y-8 divide-y divide-gray-200" >
                      <div className="space-y-8 divide-y divide-gray-200">
                        <div className="">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                            {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p> */}
                          </div>

                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                DNI
                              </label>
                              <div className="mt-1">
                                <input
                                  id="DNI"
                                  name="DNI"
                                  type="text"
                                  // defaultValue={data ? data.Dni : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4" />
                            <div className="sm:col-span-3">
                              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Nombres
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="Nombres"
                                  id="Nombres"
                                  autoComplete="given-name"
                                  // defaultValue={data ? data.Nombres : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                Apellidos
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="last-name"
                                  id="last-name"
                                  autoComplete="family-name"
                                  // defaultValue={data ? data.Apellidos : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Fecha Nacimiento
                              </label>
                              <div className="mt-1">
                                <input
                                  id="email"
                                  name="email"
                                  type="text"
                                  autoComplete="email"
                                  // defaultValue={data ? data.FechaNacimiento : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Sexo
                              </label>
                              <div className="mt-1">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  // defaultValue={data ? data.Sexo : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                  <option>MUJER</option>
                                  <option>VARON</option>
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electronico
                              </label>
                              <div className="mt-1">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  // defaultValue={data ? data.Email : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Nro Celular
                              </label>
                              <div className="mt-1">
                                <input
                                  id="email"
                                  name="email"
                                  type="text"
                                  autoComplete="email"
                                  // defaultValue={data ? data.Celular : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Distrito
                              </label>
                              <div className="mt-1">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  // value={data ? data.IDDistritoRef : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                  {/* {
                                                            // listaDistrito && listaDistrito.map((distrito: any) =>
                                                                <option key={distrito.id} value={"/distrito/" + distrito.id}>{distrito.Nombre}</option>
                                                            )
                                                        } */}
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                Dirección
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="street-address"
                                  id="street-address"
                                  autoComplete="street-address"
                                  // defaultValue={data ? data.Direccion : ""}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8">
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Condiciones</h3>
                            {/* <p className="mt-1 text-sm text-gray-500">
                                                We'll always let you know about important changes, but you pick what else you want to hear about.
                                            </p> */}
                          </div>
                          <div className="mt-6">
                            <fieldset>
                              <legend className="sr-only">By Email</legend>
                              <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                Laboral
                              </div>
                              <div className="mt-4 space-y-4">
                                <div className="relative flex items-start">
                                  <div className="flex items-center h-5">
                                    <input
                                      id="comments"
                                      name="comments"
                                      type="checkbox"
                                      // defaultChecked={data ? data.EsActivo : ""}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="comments" className="font-medium text-gray-700">
                                      ¿Es Activo?
                                    </label>
                                    {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
                                  </div>
                                </div>

                              </div>
                            </fieldset>
                            <fieldset className="mt-6">
                              <legend className="contents text-base font-medium text-gray-900">Tipo de Contrato</legend>
                              {/* <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p> */}
                              <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                  <input
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    // defaultChecked={data ? data.TipoContrato == "Indefinido" : false}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                    Indefinido
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    // defaultChecked={data ? data.TipoContrato == "Contrato3Meses" : false}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                    Contrato 3 Meses
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    id="push-nothing"
                                    name="push-notifications"
                                    type="radio"
                                    // defaultChecked={data ? data.TipoContrato == "Contrato6Meses" : false}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                  />
                                  <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                    Contrato 6 Meses
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form >
                  </div >
                </div>
                {/* Thread section*/}

              </div>
            </section>

            {/* Message list*/}
            <aside className="md:flex-shrink-0 md:order-first ">
              <div className="h-full relative flex flex-col w-5/6 md:w-96 border-r border-gray-200 bg-gray-100">
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
                  <ul role="list" className="border-b border-gray-200 divide-y divide-gray-200">
                    {data && data.map((item) => (
                      <li
                        key={item.idEmpleado}

                        className="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                      >

                        <div className="flex justify-between space-x-3">
                          <div className="min-w-0 flex-1">
                            <a href={item.Email} className="block focus:outline-none">
                              <button></button>
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-sm font-medium text-gray-900 truncate">{item.Email}</p>
                              <p className="text-sm text-gray-500 truncate">{item.Email}</p>
                            </a>
                          </div>
                          <time
                            dateTime={item.Email}
                            className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                          >
                            {item.Email}
                          </time>
                        </div>
                        <div className="mt-1">
                          <p className="line-clamp-2 text-sm text-gray-600">{item.Email}</p>
                        </div>
                        <button
                          onClick={() => setOpen(true)}
                          type="button"
                          className="md:hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >

                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                          <span>Editar</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                </nav>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  )
}

