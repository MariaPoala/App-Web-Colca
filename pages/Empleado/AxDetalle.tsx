import { Fragment, useState } from 'react'
// import AxPersona from '../AxPersona'
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function AxDetalle({ idEmpleado, setIdEmpleado }: any) {
    const [tipoEdicion, setTipoEdicion] = useState("VISUALIZAR");
    return <>
        <section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last" >
            
            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="bg-white pt-5 pb-6 shadow">
                    <div className="px-4 ">
                        {/* <AxPersona idEmpleado={idEmpleado} setIdEmpleado={setIdEmpleado} tipoEdicion={idEmpleado == 0 ? "AGREGAR" : tipoEdicion}></AxPersona> */}
                    </div>
                </div>
            </div>
        </section>
    </>
}
