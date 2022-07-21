import FnSaveData from "lib/database/save_data";
import DistritoModel from "models/distrito_model";

export default async function handler(req: any, res: any) {
    const { data, error } = await FnSaveData<DistritoModel>(req.method, req.body);
    if (error) {
        res.status(401).json(error);
    }
    else {
        res.status(200).json(data);
    }
}
