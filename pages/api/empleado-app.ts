import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "lib/firebase-config";
import app from "next/app";
import { doc, setDoc } from "firebase/firestore";
// const functions= require ('firebase-funtions')

// app.post('api/empleado', (req: any, res: any) => {
//     try {
//         const docRef = await addDoc(collection(db, "Empleado"), req.body);
//         console.log("Document written with ID: ", docRef.id);
//         res.status(200).json(docRef.id)
//     } catch (e) {
//         res.status(200).json({ error: e })
//     }
// })

// app.put('api/empleado', (req: any, res: any) => {
//     try {
//         const { idEmpleado } = req.body;
//         const docRef = doc(db, 'Empleado', idEmpleado);
//         setDoc(docRef, req.body, { merge: true });
//         res.status(200).json("documento actualizado")

//     } catch (e) {
//         res.status(200).json({ error: e })
//     }
// })