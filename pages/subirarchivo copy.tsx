import db from "lib/firebase-config";
import { getStorage, ref, uploadString } from "firebase/storage";
// Create a root reference
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

const app = initializeAppIfNecessary();
export default function Example() {
    const storage = getStorage();

    // Points to the root reference
    const storageRef = ref(storage);
    // Points to 'archivos'
    const imagesRef = ref(storageRef, 'archivos');

    // Points to 'archivos/space.jpg'
    // Note that you can use variables to create child values
    const fileName = 'space.jpg';
    const spaceRef = ref(imagesRef, fileName);

    // File path is 'archivos/space.jpg'
    const path = spaceRef.fullPath;

    // File name is 'space.jpg'
    const name = spaceRef.name;

    // Points to 'archivos'
    const imagesRefAgain = spaceRef.parent;

    uploadString(storageRef, name, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
      });
}
// import { getStorage, ref, uploadString } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // Raw string is the default if no format is provided


// // Data URL string
// const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
// uploadString(storageRef, message4, 'data_url').then((snapshot) => {
//   console.log('Uploaded a data_url string!');
// });