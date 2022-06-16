import { useEffect, useReducer, useState } from 'react';
import useSWRImmutable from 'swr/immutable'
import { useForm } from "react-hook-form";

const fetcherDistrito = (url: string): Promise<any> =>
    fetch(url, { method: 'GET' }).then(r => r.json());

const formReducer = (state: any, event: any) => {
    if (event.loadData) {
        return { ...event.loadData }
    }
    if (event.reset) {
        return {
            DNI: '1111',
            Nombres: "demo"
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}
function AxInput({ name, value, handleChange, type }: any) {
    return <input type={type || "text"}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    />
}

export default function AxEmpleado({ idEmpleado, setIdEmpleado }: any) {
    const { data: listaDistrito } = useSWRImmutable(idEmpleado ? '/api/distrito' : null, fetcherDistrito);
    const [formData, setFormData] = useReducer(formReducer, { DNI: '2222', count: 100 });
    const [submitting, setSubmitting] = useState(false);
    const [tipoEdicion, setTipoEdicion] = useState("VISUALIZAR")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/empleado/${idEmpleado}`);
            const data = await response.json();
            setFormData({ loadData: data });
        }
        fetchData().catch(console.error);
    }, [idEmpleado])


    if (idEmpleado == -1) return <></>

    const handleChange = (event: any) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitting(true);
        console.log(formData);
return;
        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            })
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
            <div className="flex h-full flex-col  bg-white shadow-xl">
                <div className="divide-y divide-gray-200">
                    <div className="pb-6">
                        <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28 " />
                        <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                            <div>
                                <div className="-m-1 flex">
                                    <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                        {formData.ImgURL ?
                                            <img
                                                className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                                src={formData.ImgURL}
                                            /> :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="bg-indigo-300 text-white h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 sm:ml-6 sm:flex-1">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{formData.Nombres + " " + formData.Apellidos || ""}</h3>
                                        <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                            <span className="sr-only">Online</span>
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{formData.Email || ""}</p>
                                </div>
                                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1">
                                        Message
                                    </button>
                                    <button type="button"
                                        className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                        <a href='https://wa.me/51916411151'>  Call</a>
                                    </button>
                                    <button type="button"
                                        onClick={() => {
                                            setTipoEdicion("EDITAR")
                                        }}
                                        className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                        Editar
                                    </button>
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
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    DNI
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="DNI" value={formData.DNI} handleChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4" />
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Nombres
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="Nombres" value={formData.Nombres} handleChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="Apellidos" className="block text-sm font-medium text-gray-700">
                                                    Apellidos
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="Apellidos" value={formData.Apellidos} handleChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="FechaNacimiento" className="block text-sm font-medium text-gray-700">
                                                    Fecha Nacimiento
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="FechaNacimiento" value={formData.FechaNacimiento} handleChange={handleChange} type="text" />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="Sexo" className="block text-sm font-medium text-gray-700">
                                                    Sexo
                                                </label>
                                                <div className="mt-1">
                                                    <select name="Sexo"
                                                        value={formData.Sexo || ""}
                                                        onChange={handleChange}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option>MUJER</option>
                                                        <option>VARON</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                                    Correo Electronico
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="Email" value={formData.Email} handleChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="Celular" className="block text-sm font-medium text-gray-700">
                                                    Nro Celular
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="Celular" value={formData.Celular} handleChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Distrito
                                                </label>
                                                <div className="mt-1">
                                                    <select name="IDDistritoRef"
                                                        value={formData.IDDistritoRef || ""}
                                                        onChange={handleChange}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        {listaDistrito && listaDistrito.map((distrito: any) =>
                                                            <option key={distrito.id} value={"/distrito/" + distrito.id}>{distrito.Nombre}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="Direccion" className="block text-sm font-medium text-gray-700">
                                                    Dirección
                                                </label>
                                                <div className="mt-1">
                                                    <AxInput name="Direccion" value={formData.Direccion} handleChange={handleChange} />
                                                </div>
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
                                                    <div className="relative flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input id="EsActivo" name="EsActivo" type="checkbox"
                                                                checked={formData.EsActivo || ""}
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
                                                </div>
                                            </fieldset>
                                            <fieldset className="mt-6">
                                                <legend className="contents text-base font-medium text-gray-900">Tipo de Contrato</legend>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input id="Indefinido" name="TipoContrato" type="radio"
                                                            value="Indefinido"
                                                            checked={formData.TipoContrato == "Indefinido" || false}
                                                            onChange={handleChange}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="Indefinido" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Indefinido
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input id="Contrato3Meses" name="TipoContrato" type="radio"
                                                            value="Contrato3Meses"
                                                            checked={formData.TipoContrato == "Contrato3Meses" || false}
                                                            onChange={handleChange}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="Contrato3Meses" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Contrato 3 Meses
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input id="Contrato6Meses" name="TipoContrato" type="radio"
                                                            value="Contrato6Meses"
                                                            checked={formData.TipoContrato == "Contrato6Meses" || false}
                                                            onChange={handleChange}
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label htmlFor="Contrato6Meses" className="ml-3 block text-sm font-medium text-gray-700">
                                                            Contrato 6 Meses
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button onClick={() => { setIdEmpleado(-1) }} type="button"
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
                                        {/* <button type="submit"
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Guardar
                                        </button> */}
                                        <button type="submit"
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                                            disabled={submitting}>Submit</button>
                                    </div>
                                </div>
                            </form >
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}
