import db from "lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
       
        const querySnapshot = await getDocs(collection(db, "documento"));
        // const alovelaceDocumentRef = await getDocs( collection(db, "Empleado").doc('alovelace'));
        let data: any = []
        querySnapshot.forEach((doc) => {
            // let registro: any = {};
            //let dataDB = doc.data();
            // let refDistrito = await dataDB.IDDistrito.get().data();
            // registro = { id: doc.id, ...dataDB };
            // data.push(registro)
            // res.status(200).json(refDistrito)

            data.push({ id: doc.id, ...doc.data() });
            //console.log(dataDB.Nombres)
            // doc..get().then(snap => {
            //     comment.user = snap.data()
            //     comments.push(comment)
            //   })
        });
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ error: e })
    }
}