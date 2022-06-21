import db from "lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    try {
       
        const querySnapshot = await getDocs(collection(db, "distrito"));
        let data: any = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ error: e })
    }
}