// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc, getDoc, persistentLocalCache, initializeFirestore, getDocs, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

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
    localCache: persistentLocalCache({}),
});


const provider = new GoogleAuthProvider();

function handleAuthClick(){
    signInWithPopup(auth, provider)
    .then(result => {
        const user = result.user;
        setDoc(doc(db, "public", "publicData", "users", user.uid), {photoURL: user.photoURL, displayName: user.displayName, email: user.email}, {merge: true});
    })
    .catch(err => console.log(err));
}

async function saveCard(topic, title, sourceName, sourceLink, contention, evidence, isStarred){
    getDoc(doc(db, "public", "publicCards")).then((result) => {
        const id = parseInt(result.data().cardIDCounter) + 1;
        const cardID = id.toString();
        if(!topic || !cardID || !title || !sourceName || !sourceLink || !evidence || !contention){
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
                return;
            })
        })
    })
}

async function isUserInTeam(email){
    const docs = (await getDocs(collection(db, "public", "publicData", "users"))).docs;
    const users = [];
    var returnValue;
    for(let i = 0; i < docs.length; i++){
        users[i] = Object.assign({}, docs[i].data(), {id: docs[i].id});
    }
    
    users.forEach(user => {
        if(user.email == email){
            returnValue =  user;
        }
    });

    if(returnValue != undefined){
        return returnValue
    }else{
        return 404
    }
}

async function createTeam(teamName, owner, teamMember){
    const data = {
        teamName: teamName,
        members: [owner, teamMember],
    }

    const teamID = (await addDoc(collection(db, "teams"), data)).id;
    console.log(teamID);
    await setDoc(doc(db, "public", "publicData", "users", owner), {teamID: teamID}, {merge: true});
    await setDoc(doc(db, "public", "publicData", "users", teamMember), {teamID: teamID}, {merge: true});
    return;
}

export { handleAuthClick, saveCard, db, auth, isUserInTeam, createTeam }