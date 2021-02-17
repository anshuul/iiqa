import { auth, firestore } from '../shared/firebase'

export async function signInStudent(emailId, password){
    const user = await auth.signInWithEmailAndPassword(emailId, password)
    console.log(user)
}