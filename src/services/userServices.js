import { auth, firestore } from '../shared/firebase'

const User = firestore.collection('users')
const Student = firestore.collection('students')

export function signIn(emailId, password){
    return auth.signInWithEmailAndPassword(emailId, password)
    // const { uid } = auth.currentUser
    // const currentUser = await getUserProfile(uid)
    // return currentUser
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
        await User.add({
            fname, lname, uid, isTeacher:true, isStudent:false
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
     * store uid in users collection and set isStudent flag on and get the docid
     * store the docid in student collection
     */
    try{
        await auth.createUserWithEmailAndPassword(email, password)
        const { uid } = auth.currentUser
        const { id } = await User.add({
            fname, lname, uid, isStudent:true, isTeacher:false
        })
        await Student.add({
            userDocId: id,
        })
        return 'New Student created succesfully'

    }catch(err){
        throw new Error(err)
    }
}

export async function getOnlyUserProfile(id){
    console.log(id)
    let userData = null
    const userProfilesList = await User.where('uid','==',id).get()
    if(userProfilesList.empty){
        throw new Error('No matching records')
    }
    userProfilesList.forEach((userProfile) => {
        userData = {docId: userProfile.id, ...userProfile.data()}
    })
    return userData
}

export async function getUserProfile(id){
    /**
     * @param id
     * 
     * @return userProfile
     * 
     * get the user doc from given id
     * get the student data if from doc id if user type is student
     */
    if(!id){
        return null
    }
    let userData = null
    let responseData = null
    userData = await getOnlyUserProfile(id)
    if (userData.isStudent){
        let studentData = null
        
        const studentProfilesList = await Student.where('userDocId', '==', userData.docId).get()
        if(studentProfilesList.empty){
            throw new Error('No matching student record')
        }
        studentProfilesList.forEach(studentProfile => {
            studentData = studentProfile.data()
            responseData = {...userData, ...studentData}
        })
    } else {
        responseData = userData
    }
    return responseData
    
}