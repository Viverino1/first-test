// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { Info } from "react-bootstrap-icons";

const firebaseConfig = {
  apiKey: "AIzaSyB4aCc_kQxND2WJUv1klAM2XQ-H__SBpME",
  authDomain: "debatetool-4dd03.firebaseapp.com",
  projectId: "debatetool-4dd03",
  storageBucket: "debatetool-4dd03.appspot.com",
  messagingSenderId: "1001598404295",
  appId: "1:1001598404295:web:02bc7ba42a20ead41620e2",
  measurementId: "G-6ZJJCXHK81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

function handleAuthClick(){
    signInWithPopup(auth, provider)
    .then(result => {
        console.log(result.user.displayName);
    })
    .catch(err => console.log(err));
}

function handleSignOutClick(){
    auth.signOut();
}

function saveEvent(eventID, topic, title, sourceName, sourceLink, contention, evidence){
    if(!title || !sourceName || !sourceLink || !contention || !evidence){
        console.log("Empty fields")
        //return;
    }

    const cardsRef = collection(db, "public", "publicCards", topic);

    setDoc(doc(cardsRef, eventID), {
        title: title,
        sourceName: sourceName,
        sourceLink: sourceLink,
        contention: contention,
        evidence: evidence,
        eventID: eventID,
    })
}

export { handleAuthClick, handleSignOutClick, saveEvent, db }