export function AxSelect({ name, value, label, handleChange, disabled = false, children }: any) {
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <select name={name}
                    value={value || ""}
                    disabled={disabled}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                    <option key={name + "$NULL"} value={""}>Seleccionar...</option>
                    {children}
                </select>
            </div>
        </>
    )
}

export function AxSelectFiltro({ name, value, label, handleChange, children }: any) {
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
                    <option key={name + "$NULL"} value={""}>Seleccionar...</option>
                    {children}
                </select>
            </div>
        </>
    )
}