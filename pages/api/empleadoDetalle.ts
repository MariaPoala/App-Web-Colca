import db from "lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    const { idEmpleado } = req.body;

    const docRef = doc(db, "Empleado", idEmpleado);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json(docSnap.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}