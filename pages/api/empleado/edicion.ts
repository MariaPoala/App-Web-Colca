import db from "lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
        if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "Empleado2"), req.body);
            res.status(200).json({ IDEmpleado: docRef.id, msg: "Registro exitoso" })
        }
        else if (req.method == "PUT") {
            const docRef = doc(db, 'Empleado2', req.body.IDEmpleado);
            setDoc(docRef, req.body, { merge: true });
            res.status(200).json("documento actualizado")
        }
      
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}