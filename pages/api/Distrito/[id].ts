import supabase from "lib/supabase-config";
import DistritoModel from "models/distrito-model";

export default async function handler(req: any, res: any) {
    const { id } = req.query
    const { data, error } = await supabase
        .from<DistritoModel>('distrito')
        .select()
        .eq('id' as keyof DistritoModel, id);
    if (data && data.length > 0) {
        res.status(200).json(data[0])
    } else {
        res.status(200).json({ error: "documento no encontrado" })
    }
}


// import db from "lib/firebase-config";
// import { doc, getDoc } from "firebase/firestore";

// export default async function handler(req: any, res: any) {
//     const { id: IDDistrito } = req.query
//     const docRef = doc(db, "Distrito", IDDistrito);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         res.status(200).json(docSnap.data())
//     } else {
//         res.status(200).json({ error: "documento no encontrado" })
//     }
// }