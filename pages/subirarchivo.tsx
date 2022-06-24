import React, { useState, useEffect } from 'react'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import * as uuid from 'uuid'
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { url } from 'inspector';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
import db from "lib/firebase-config";
db.app

export default function ModalEmpresa() {
    //subir archivo
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

    //subir archivo
    return (
        <aside id="modal" className="modal">
            <div className="content-modal">
                <header>
                    <input type="file" name="imagen" onChange={changeImagen} />
                    <button onClick={uploadimage} >GUARDAR IMAGEN</button>
                    <button >GUARDAR </button>
                </header>
                <div className="bg-white">
                    <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                        <div className="space-y-12">

                            <ul
                                role="list"
                                className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
                            >
                                {listaimage && listaimage.map((url) => (
                                    <li key={url.url}>
                                        <div className="space-y-4">
                                            <div className="aspect-w-3 aspect-h-2">

                                                <img className="object-cover shadow-lg rounded-lg" src={url} alt="" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}