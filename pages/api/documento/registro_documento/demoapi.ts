import db from "lib/firebase-config";
import { doc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, startAfter, limit } from "firebase/firestore";
import { NextApiRequest } from "next";

interface Params {
    inicio: number
    cantidad: number
}

export default async function handler(req: any, res: any) {
    // console.log(doc.length)
    try {
        if (req.method == "VistaEmpleado") {

        }
        else if (req.method == "GET") {
            const { inicio, cantidad } = (req.query);
            const consulta = query(
                collection(db, "RegistroDocumento"),
                orderBy("Orden"),
                startAfter(parseInt(inicio)),
                limit(parseInt(cantidad)));
            const result = await getDocs(consulta)
            let data: any = []
            result.forEach(doc => data.push(doc.data()));
            res.status(200).json(data)
        }
        else if (req.method === 'POST') {
            const docRef = await addDoc(collection(db, "RegistroDocumento"), req.body);
            const updateID = await updateDoc(docRef, {
                ID: docRef.id
            });
            res.status(200).json({ ID: docRef.id, msg: "Registro exitoso" })
        }
        else if (req.method == "PUT") {
            const docRef = doc(db, 'RegistroDocumento', req.body.ID);
            setDoc(docRef, req.body, { merge: true });
            res.status(200).json("documento actualizado")
        }
        else if (req.method == "DELETE") {
            const docRef = doc(db, 'RegistroDocumento', req.body.ID);
            deleteDoc(docRef)
            res.status(200).json("documento eliminado")
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}
