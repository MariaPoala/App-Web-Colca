import db from "lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
        if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "Empleado"), req.body);
            console.log("Document written with ID: ", docRef.id);
            res.status(200).json(docRef.id + " Registro exitoso")
        }
        else if (req.method == "PUT") {
            const { idEmpleado } = req.body;
            const docRef = doc(db, 'Empleado', idEmpleado);
            setDoc(docRef, req.body, { merge: true });
console.log(docRef)
            res.status(200).json("documento actualizado")
            
        }
    } catch (e) {
        res.status(500).json({ error: e })
    }

}