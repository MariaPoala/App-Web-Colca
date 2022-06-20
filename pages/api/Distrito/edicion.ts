import db from "lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
        if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "distrito"), req.body);
            res.status(200).json({ idDistrito: docRef.id, msg: "Registro exitoso" })
        }
        else if (req.method == "PUT") {
            const docRef = doc(db, 'distrito', req.body.idDistrito);
            setDoc(docRef, req.body, { merge: true });
            res.status(200).json("documento actualizado")
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}