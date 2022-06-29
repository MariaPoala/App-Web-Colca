import db from "lib/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    const { id: IDEmpleado } = req.query
    const docRef = doc(db, "Empleado", IDEmpleado);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json(docSnap.data())
    } else {
        res.status(200).json({ error: "documento no encontrado" })
    }
}