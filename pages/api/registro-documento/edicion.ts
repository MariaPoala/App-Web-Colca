import db from "lib/firebase-config";
import { doc, setDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    // console.log(doc.length)
    try {
        if (req.method == "VistaEmpleado") {
           
        }
        else if (req.method == "GET") {
            const querySnapshot = await getDocs(collection(db, "RegistroDocumento"));
            let data: any = []
            querySnapshot.forEach(doc => data.push(doc.data()));
            // res.status(200).json(data)
            let empleado: any = []
            let id: string = ""
            let nombre: string = ""
            const listEmpleado = await getDocs(collection(db, "Empleado"));
            listEmpleado.forEach(i => empleado.push(i.data()));
            empleado.forEach((d: any) =>
                nombre = d.Nombres
            )
            // console.log(data, nombre)
            res.status(200).json(data)
            // console.log(id)
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
