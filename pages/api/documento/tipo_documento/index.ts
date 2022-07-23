import FnSaveData from "lib/database/save_data";
import TipoDocumentoModel from "models/tipo_documento_model";

export default async function handler(req: any, res: any) {
    const { data, error } = await FnSaveData<TipoDocumentoModel>("tipo_documento", req.method, req.body);
    if (error) {
        res.status(401).json(error);
    }
    else {
        res.status(200).json(data);
    }
}
