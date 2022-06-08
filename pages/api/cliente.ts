import db from "lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    const querySnapshot = await getDocs(collection(db, "users"));
    let data: any = []
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(data)
}