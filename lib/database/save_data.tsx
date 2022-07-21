import supabase from "lib/supabase-config";
type TypeResultado = {
    data: any;
    error: any
}

export default async function FnSaveData<T>(method: string, body: any): Promise<{ data: null | T | T[]; error: any }> {
    try {
        const datos = { ...body };
        const id = datos.id;
        if (method == "GET") {
            const { data, error } = await supabase.from<T>('distrito').select()
            return { data: data || [], error };
        }
        else if (method === 'POST') {
            delete datos['id'];
            delete datos['fecha_creacion'];
            delete datos['fecha_edicion'];
            const { data, error } = await supabase.from<T>('distrito').insert(datos);
            return { data: data && data[0], error }
        }
        else if (method == "PUT") {
            delete datos['id'];
            delete datos['fecha_creacion'];
            delete datos['fecha_edicion'];
            const { data, error } = await supabase.from<T>('distrito').update(datos).match({ id: id })
            return { data: data && data[0], error }
        }
        else if (method == "DELETE") {
            const { data, error } = await supabase
                .from('distrito')
                .delete()
                .match({ id: id })
            return { data: data && data[0], error }
        }
        return { data: null, error: { msg: "Metodo no implementado" } };

    } catch (e) {
        return { data: null, error: e };
    }
}