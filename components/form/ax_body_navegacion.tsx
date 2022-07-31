import { navigation, secondaryNavigation } from '../layout/ax_menu_item'
import Link from 'next/link'
import useSWRImmutable from "swr/immutable"
import { useRouter } from 'next/router'
import { NombreTramite } from 'lib/edicion';
import { Dialog, Disclosure, Transition } from '@headlessui/react'
const fetcherGrupo = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());
function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

export default function AxBodyNavegacion({ clase }: any) {
    const { data: listaGrupo } = useSWRImmutable('/api/administracion/grupo', fetcherGrupo);
    const router = useRouter();
    return <nav className="mt-5 flex-1 flex flex-col divide-y divide-indigo-500 overflow-y-auto" aria-label="Sidebar">
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
                                        // item.name == "Tramites" ?
                                        //     (listaGrupo && listaGrupo.map((grupoItem:any) => (
                                        //         <Link key={grupoItem.nombre} href='/tramite'>
                                                    
                                        //             <Disclosure.Button
                                        //                 key={grupoItem.nombre}
                                        //                 as="a"
                                        //                 href='/tramite'
                                        //                 className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-500"
                                        //             >
                                        //                 <subItem.icon className="mr-4 flex-shrink-0 h-5 w-5 text-indigo-200" aria-hidden="true"></subItem.icon>
                                        //                 {grupoItem.nombre}
                                        //             </Disclosure.Button>
                                        //         </Link>
                                        //     )))
                                        //     :
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
    </nav>;
}


