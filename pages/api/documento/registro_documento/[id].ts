import supabase from "lib/supabase_config";
import RegistroDocumentoModel from "models/registro_documento_model";

export default async function handler(req: any, res: any) {
    const { id } = req.query
    const { data, error } = await supabase.from<RegistroDocumentoModel>('registro_documento').select().eq('id' as keyof RegistroDocumentoModel, id);
    if (data && data.length > 0) {
        res.status(200).json(data[0])
    } else {
        res.status(200).json({ error: "documento no encontrado" })
    }
}