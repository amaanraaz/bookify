import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import { getFirestore,collection,addDoc,getDocs } from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCNOamX4XDE6JQc5S5spJFgE0fERuVin7M",
    authDomain: "bookify-8a4da.firebaseapp.com",
    projectId: "bookify-8a4da",
    storageBucket: "bookify-8a4da.appspot.com",
    messagingSenderId: "653788902064",
    appId: "1:653788902064:web:6c780dad664131a8cbc175"
  };

export const useFirebase = ()=>useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props)=>{
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            console.log("user",user)
            user?setIsLoggedIn(true):setIsLoggedIn(false);
        },)
    })

    const signupUserWithEmailAndPassword = (email,password) =>{
        createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signInUserWithEmailAndPassword = (email,password) =>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signInWithGoogle = ()=>{
        signInWithPopup(firebaseAuth,googleProvider)
    }
    const handleCreateNewListing = async(name,price,isbn,cover)=>{
        console.log(cover)
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,'books'),{
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
        });
    };

    const listAllBooks = async()=>{
        return await getDocs(collection(firestore,'books'));
    }
    
    const getImageUrl = (path)=>{
        return getDownloadURL(ref(storage,path))
    }

    return <FirebaseContext.Provider value={{
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signInWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageUrl,
        isLoggedIn
    
    }}>{props.children}</FirebaseContext.Provider>
}