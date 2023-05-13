// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs, persistentLocalCache, persistentMultipleTabManager, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

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
const db = initializeFirestore(app, {
    localCache: persistentLocalCache(/*settings*/{}),

});


const provider = new GoogleAuthProvider();

function handleAuthClick(){
    signInWithPopup(auth, provider)
    .then(result => {
        const user = result.user
        setDoc(doc(db, "public", "publicData", "users", user.uid), {photoURL: user.photoURL, displayName: user.displayName}, {merge: true})
    })
    .catch(err => console.log(err));
}

function handleSignOutClick(){
    auth.signOut();
}

function saveCard(topic, title, sourceName, sourceLink, contention, evidence, isStarred){
    getDoc(doc(db, "public", "publicCards")).then((result) => {
        const id = parseInt(result.data().cardIDCounter) + 1;
        const cardID = id.toString();
        if(!topic || !cardID || !title || !sourceName || !sourceLink || !evidence){
            console.log("Empty fields")
            return;
        }
        const cardsRef = collection(db, "public", "publicCards", topic);

        setDoc(doc(cardsRef, cardID), {
            topic: topic,
            title: title,
            sourceName: sourceName,
            sourceLink: sourceLink,
            contention: contention,
            evidence: evidence,
            cardID: parseInt(cardID),
            isStarred: isStarred,
            ownerUID: auth.currentUser.uid,
        }, {merge: true}).then(() => {
            setDoc(doc(db, "public", "publicCards"), {cardIDCounter: cardID}, {merge: true}).then(() => {
                window.open("/view", "_self");
            })
        })
    })
}

export { handleAuthClick, handleSignOutClick, saveCard, db, auth }