import db from "lib/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
        else if (req.method == "GET") {
            const querySnapshot = await getDocs(collection(db, "Empleado2"));
            let data: any = []
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), ID: doc.id });
            });
            res.status(200).json(data)
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e })
    }

}
