import { auth, firestore } from '../shared/firebase'

const newUser = firestore.collection('users')
const newStudent = firestore.collection('students')

export function signIn(emailId, password){
    return auth.signInWithEmailAndPassword(emailId, password)
}

export function signOut(){
    return auth.signOut()
}

export async function signUpForTeacher(email, password, fname, lname){
    /**
     * @param email
     * @param password
     * @param fname
     * @param lname
     * 
     * @return successs message
     * 
     * createacc on firebase auth and get the uid
     * store uid in users collection with set isTeacher flag on
     */

    try{
        await auth.createUserWithEmailAndPassword(email, password)
        const { uid } = auth.currentUser
        await newUser.add({
            fname, lname, uid, isTeacher:true
        })
        return 'New Teacher Account created Succesfully'

    }catch(err){
        throw new Error(err)
    }
}

export async function signUpForStudent(email, password, fname, lname){
    /**
     * @param email
     * @param password
     * @param fname
     * @param lname
     * 
     * @return sucess message
     * 
     * createacc on firebase auth and get uid
     * store uid in users collection and set isStudent flag on get the docid
     * store the docid in student collection
     */
    try{
        await auth.createUserWithEmailAndPassword(email, password)
        const { uid } = auth.currentUser
        const { id } = await newUser.add({
            fname, lname, uid, isStudent:true
        })
        await newStudent.add({
            userDocId: id,
        })
        return 'New Student created succesfully'

    }catch(err){
        throw new Error(err)
    }
}