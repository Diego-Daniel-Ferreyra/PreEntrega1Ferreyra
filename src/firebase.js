
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBNvNN4AAVciq42e8OkmFIP3lY9Tiyvqm4",
    authDomain: "reactcoderhouse-c647a.firebaseapp.com",
    projectId: "reactcoderhouse-c647a",
    storageBucket: "reactcoderhouse-c647a.appspot.com",
    messagingSenderId: "90760621292",
    appId: "1:90760621292:web:b7d01863358b6b5da109c9"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);





