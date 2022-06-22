import db from "lib/firebase-config";
import { collection, addDoc, deleteDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
        if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "ciudadano"), req.body);
            res.status(200).json({ idCiudadano: docRef.id, msg: "Registro exitoso" })
        }
        else if (req.method == "PUT") {
            const docRef = doc(db, 'ciudadano', req.body.idCiudadano);
            setDoc(docRef, req.body, { merge: true });
            res.status(200).json("documento actualizado")
        }
        else if (req.method == "DELETE") {
            const docRef = doc(db, 'ciudadano', req.body.idCiudadano);
            deleteDoc(docRef)            
            res.status(200).json("documento eliminado")
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}