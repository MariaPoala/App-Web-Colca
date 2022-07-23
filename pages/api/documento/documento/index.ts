import FnSaveData from "lib/database/save_data";
import DocumentoModel from "models/documento_model";

export default async function handler(req: any, res: any) {
    const { data, error } = await FnSaveData<DocumentoModel>("documento", req.method, req.body);
    if (error) {
        res.status(401).json(error);
    }
    else {
        res.status(200).json(data);
    }
}
