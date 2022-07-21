import db from "lib/firebase-config";
import { doc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
        if (req.method == "GET") {
            const querySnapshot = await getDocs(collection(db, "Documento"));
            let data: any = []
            querySnapshot.forEach(doc => data.push(doc.data()));
            res.status(200).json(data)
        }
        else if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "Documento"), req.body);
            const updateID = await updateDoc(docRef, {
                ID: docRef.id
            });
            res.status(200).json({ ID: docRef.id, msg: "Registro exitoso" })
        }
        else if (req.method == "PUT") {
            const docRef = doc(db, 'Documento', req.body.ID);
            setDoc(docRef, req.body, { merge: true });
            res.status(200).json("documento actualizado")
        }
        else if (req.method == "DELETE") {
            const docRef = doc(db, 'Documento', req.body.ID);
            deleteDoc(docRef)
            res.status(200).json("documento eliminado")
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}
