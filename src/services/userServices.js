import { auth, firestore } from '../shared/firebase'

export function signIn(emailId, password){
    return auth.signInWithEmailAndPassword(emailId, password)
}

export function signOut(){
    return auth.signOut()
}