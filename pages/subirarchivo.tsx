import React, { useState, useEffect } from 'react'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import * as uuid from 'uuid'
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { url } from 'inspector';
const firebaseConfig = {
    // apiKey: "AIzaSyDg64UwtUnU5YpLIpoYnXMRe7wcFaqC9CI",
    // authDomain: "appcolca.firebaseapp.com",
    // projectId: "appcolca",
    // storageBucket: "appcolca.appspot.com",
    // messagingSenderId: "865337723011",
    // appId: "1:865337723011:web:7e0ad370f8cf5ef480f3b6"
    apiKey: "AIzaSyB1yUWinJNnyzjazzjpBows8br3drb0Eq4",
    authDomain: "mdcolca-d6172.firebaseapp.com",
    projectId: "mdcolca-d6172",
    storageBucket: "mdcolca-d6172.appspot.com",
    messagingSenderId: "547890961127",
    appId: "1:547890961127:web:18f73793e7696aa70c6042"
};
// Initialize Firebase

function initializeAppIfNecessary() {
    try {
        return getApp();
    } catch (any) {
        return initializeApp(firebaseConfig);
    }
}

initializeAppIfNecessary();


export default function ModalEmpresa() {
    const [imagenupload, setImagen] = useState(null);
    const storage = getStorage();
    const [listaimage, setListaimage] = useState<Array<any>>([]);

    //OBTENIENDO LA IMAGEN
    const changeImagen = (e: any) => {
        setImagen(e.target.files[0]);
        console.log(imagenupload);

    }
    const igameListRef = ref(storage, "images/")
    const uploadimage = () => {
        if (imagenupload == null) return;
        const imageRef = ref(storage, `images/${setImagen.name + uuid.v4()}`)
        uploadBytes(imageRef, imagenupload).then((snapshot) => {
            alert('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((url) => {
                setListaimage((prev) => [...prev, url]);
            })
        });
    }

    useEffect(() => {
        listAll(igameListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setListaimage((prev) => [...prev, url]);
                })
            })
            console.log(response)
        })
    }, [imagenupload])
    return (
        <aside id="modal" className="modal">
            <div className="content-modal">
                <header>
                    <input type="file" name="imagen" onChange={changeImagen} />
                    <button onClick={uploadimage} >GUARDAR IMAGEN</button>
                    <button >GUARDAR </button>
                </header>
                {listaimage && listaimage.map((url) => (
                    <img src={url}></img>
                ))}
            </div>
        </aside>
    )
}