import { Children, useEffect, useReducer, useState } from "react";
import useSWRImmutable from "swr/immutable"

const fetcherDistrito = (url: string): Promise<any> =>
    fetch(url, { method: "GET" }).then(r => r.json());

const formReducer = (state: any, event: any) => {
    if (event.FORM_DATA) {
        return { ...event.FORM_DATA }
    }
    if (event.FORM_ADD) {
        return {
            DNI: "",
            EsActivo: true,
            TipoContrato: "Contrato3Meses",
            Sexo: "MUJER",
            Nombres: "",
            Apellidos: ""
        }
    }
    return { ...state, [event.name]: event.value }
}
function AxInput({ name, value, label, handleChange, type }: any) {
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input type={type || "text"}
                    name={name}
                    value={value || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:text-gray-500"
                />
            </div>
        </>
    )
}

function AxRadio({ id, name, value, label, handleChange }: any) {
    return (
        <div className="flex items-center">
            <input id={id} name={name} type="radio"
                value={id}
                checked={value == id || false}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700" >
                {label}
            </label>
        </div>
    )
}

function AxCheck({ id, name, value, label, handleChange }: any) {
    return (
        <div className="relative flex items-start">
            <div className="flex items-center h-5">
                <input id={id} name={name} type="checkbox"
                    checked={value || false}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="EsActivo" className="font-medium text-gray-700">
                    ¿Es Activo?
                </label>
            </div>
        </div>
    )
}

function AxSelect({ name, value, label, handleChange, children }: any) {
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <select name={name}
                    value={value || ""}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                    {children}
                </select>
            </div>
        </>
    )
}

function AxButtonGuardar({ loading }: any) {
    return <button type="submit"
        className="
        ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        disabled={loading}>
        {
            loading &&
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        }
        Guardar
    </button>
}

export default function AxEmpleado({ idEmpleado, setIdEmpleado }: any) {
    const { data: listaDistrito } = useSWRImmutable('/api/distrito', fetcherDistrito);
    const [formData, setFormData] = useReducer(formReducer, { DNI: '2222', count: 100 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoEdicion, setTipoEdicion] = useState("VISUALIZAR")

    useEffect(() => {
        setTipoEdicion(idEmpleado == 0 ? "AGREGAR" : "VISUALIZAR");
        if (idEmpleado == 0) {
            setFormData({ FORM_ADD: true })
        }
        else {
            setIsLoading(true)
            const fetchData = async () => {
                // await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`/api/empleado/${idEmpleado}`);
                const data = await response.json();
                setFormData({ FORM_DATA: data });
                setIsLoading(false)
            }
            fetchData().catch(console.error);
        }
    }, [idEmpleado])

    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            // setFormData({
            //     reset: true
            // })
        }, 3000);
    }

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault()
    //     console.log(tipoEdicion);
    //     return;
    //     console.log(tipoEdicion);
    //     let form = event.target;
    //     const dataForm = {
    //         idEmpleado: idEmpleado,
    //         DNI: form.DNI.value,
    //         Nombres: form.Nombres.value,
    //         Apellidos: form.Apellidos.value,
    //         Celular: form.Celular.value,
    //         Direccion: form.Direccion.value,
    //         Email: form.Email.value,
    //         EsActivo: form.EsActivo.value,
    //         Sexo: form.Sexo.value,
    //         TipoContrato: form.TipoContrato.value,
    //     }
    //     if (tipoEdicion == "Agregar") {
    //         console.log("agregando empelado");
    //     }
    //     if ((tipoEdicion == "Editar")) {
    //         console.log("etitando empelado");
    //         const JSONdata = JSON.stringify(dataForm)
    //         const response = await fetch('/api/guardarempleado', {
    //             body: JSONdata,
    //             headers: { 'Content-Type': 'application/json', },
    //             method: 'PUT'
    //         })

    //         const result = await response.json()
    //         alert(`Is this your full name: ${result}`)
    //     }
    // }
    return (
        <>
            <div className={isLoading ? "animate-pulse" : "" + " flex h-full flex-col  bg-white shadow-xl"}>
                <div className="divide-y divide-gray-200">
                    <div className="pb-6">
                        <div className="h-16 bg-indigo-700 sm:h-16 lg:h-16 " />
                        <div className="lg:-mt-6 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                            {/*IMG PERFIL*/}
                            <div>
                                <div className="-m-1 flex">
                                    <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                        {formData.ImgURL
                                            ? <img className="h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32 lg:h-36 lg:w-36" src={formData.ImgURL} />
                                            : <svg xmlns="http://www.w3.org/2000/svg" className="bg-indigo-300 text-white h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32 lg:h-36 lg:w-36" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*CABECERA*/}
                            <div className="sm:ml-6 sm:flex-1">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{formData.Nombres + " " + formData.Apellidos || ""}</h3>
                                        <span className={(formData.EsActivo ? "bg-green-500" : "bg-slate-500") + " ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full"}>
                                            <span className="sr-only">Online</span>
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{formData.Email || ""}</p>
                                </div>
                                {/*AREA DE EDICIÓN*/}
                                <div className="ml-3 w-0 flex-1">
                                    <div className="mt-2 flex">
                                        {
                                            tipoEdicion == "VISUALIZAR" ? <>
                                                <button type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    Llamar
                                                </button>
                                                <button type="button"
                                                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <svg className="w-4 h-4 text-white fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                                    </svg>
                                                    Mensaje
                                                </button>
                                                <button type="button"
                                                    onClick={() => setTipoEdicion("EDITAR")}
                                                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Editar
                                                </button>
                                            </>
                                                :
                                                <div className="w-8 h-8" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <div className="p-4 md:p-6">
                            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
                                <fieldset disabled={tipoEdicion == "VISUALIZAR"} className="space-y-8 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Información Personal </h3>
                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-2">
                                                <AxInput name="DNI" label="DNI" value={formData.DNI} handleChange={handleChange} />
                                            </div>
                                            <div className="sm:col-span-4" />
                                            <div className="sm:col-span-3">
                                                <AxInput name="Nombres" label="Nombres" value={formData.Nombres} handleChange={handleChange} />
                                            </div>
                                            <div className="sm:col-span-3">
                                                <AxInput name="Apellidos" label="Apellidos" value={formData.Apellidos} handleChange={handleChange} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <AxInput name="FechaNacimiento" label="Fecha Nacimiento" value={formData.FechaNacimiento} handleChange={handleChange} type="text" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <AxSelect name="Sexo" value={formData.Sexo} label="Sexo" handleChange={handleChange}>
                                                    <option>MUJER</option>
                                                    <option>VARON</option>
                                                </AxSelect>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <AxInput name="Email" label="Correo Electronico" value={formData.Email} handleChange={handleChange} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <AxInput name="Celular" label="Nro Celular" value={formData.Celular} handleChange={handleChange} />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <AxSelect name="IDDistritoRef" value={formData.IDDistritoRef} label="Distrito" handleChange={handleChange}>
                                                    {listaDistrito && listaDistrito.map((distrito: any) => <option key={distrito.id} value={"/distrito/" + distrito.id}>{distrito.Nombre}</option>)}
                                                </AxSelect>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <AxInput name="Direccion" label="Dirección" value={formData.Direccion} handleChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Condiciones</h3>
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                <legend className="sr-only">By Email</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    Laboral
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    <AxCheck id="EsActivo" name="EsActivo" value={formData.EsActivo} label="¿Es Activo?" handleChange={handleChange} />
                                                </div>
                                            </fieldset>
                                            <fieldset className="mt-6">
                                                <legend className="contents text-base font-medium text-gray-900">Tipo de Contrato</legend>
                                                <div className="mt-4 space-y-4">
                                                    <AxRadio id="Indefinido" name="TipoContrato" value={formData.TipoContrato} label="Indefinido" handleChange={handleChange} />
                                                    <AxRadio id="Contrato3Meses" name="TipoContrato" value={formData.TipoContrato} label="Contrato 3 Meses" handleChange={handleChange} />
                                                    <AxRadio id="Contrato6Meses" name="TipoContrato" value={formData.TipoContrato} label="Contrato 6 Meses" handleChange={handleChange} />
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </fieldset>
                                {tipoEdicion != "VISUALIZAR" && <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button onClick={() => { tipoEdicion == "EDITAR" ? setTipoEdicion("VISUALIZAR") : setIdEmpleado(-1) }} type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
                                        <AxButtonGuardar loading={isSubmitting} />
                                    </div>
                                </div>
                                }
                            </form >
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}
