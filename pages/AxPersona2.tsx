/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
    return (
        <div className="p-4 md:p-6">
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div className="">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    DNI
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
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
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
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
                                        type="email"
                                        autoComplete="email"
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
                                    <input id="email" name="email" type="email" autoComplete="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Telefono
                                </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
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
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                    Dirección
                                </label>
                                <div className="mt-1">
                                    <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <div className="mt-1">
                                    <input type="text" name="city" id="city" autoComplete="address-level2" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    State / Province
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Condiciones</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Well always let you know about important changes, but you pick what else you want to hear about.
                            </p>
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
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                ¿Es Activo?
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset className="mt-6">
                                <legend className="contents text-base font-medium text-gray-900">Tipo de Contrato</legend>
                                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
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
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}
