import { auth } from '../shared/firebase'
import { dbAPI, getTokenizedHeader } from '../shared/utils'

export async function signIn(emailId, password){
    try {
        const { user } = await auth.signInWithEmailAndPassword(emailId, password)
        const token = await user.getIdToken()
        const response = await dbAPI.post('/auth/login', {token})
        await auth.signOut()
        console.log(response)
        return user.uid
        // const currentUser = await getUserProfile(uid)
        // return currentUser
    } catch(err) {
        throw err
    }
}

export async function signOut(){
    await auth.signOut()
    await dbAPI.post('/auth/logout')
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
        const {user} = await auth.createUserWithEmailAndPassword(email, password)
        const token = await user.getIdToken()
        const response = await dbAPI.post('/auth/login', {token})
        console.log(user)
        const { uid } = user
        try {
            await dbAPI.post('/users/', {
                fname, lname, uid, isTeacher:true
            })
            return uid
        } catch (err) {
            throw new Error(err.response.data.error)
        }
    }catch(err){
        throw err
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
        const {user} = await auth.createUserWithEmailAndPassword(email, password)
        const token = await user.getIdToken()
        const response = await dbAPI.post('/auth/login', {token})
        console.log(user)
        const { uid } = user
        try {
            await dbAPI.post('/users/', {
                fname, lname, uid, isStudent:true
            })
            return uid
        } catch (err) {
            throw new Error(err.response.data.error)
        }
    }catch(err){
        throw err
    }
}

export async function getOnlyUserProfile(){
    try {
        const {data} = await dbAPI.get(`/users/?current=true`)
        return data.user
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

// export async function getUserProfile(id){
//     /**
//      * @param id
//      * 
//      * @return userProfile
//      * 
//      * get the user doc from given id
//      * get the student data if from doc id if user type is student
//      */
//     if(!id){
//         return null
//     }
//     let userData = null
//     let responseData = null
//     userData = await getOnlyUserProfile(id)
//     if (userData.isStudent){
//         let studentData = null
        
//         const studentProfilesList = await Student.where('userDocId', '==', userData.docId).get()
//         if(studentProfilesList.empty){
//             throw new Error('No matching student record')
//         }
//         studentProfilesList.forEach(studentProfile => {
//             studentData = studentProfile.data()
//             responseData = {...userData, ...studentData}
//         })
//     } else {
//         responseData = userData
//     }
//     return responseData
    
// }

export async function getProfileDataFromDocId(docId){
    /**
     * @param docId
     * 
     * @return user profile details
     */

     try {
        const {data} = await dbAPI.get(`/users/?userDocId=${docId}`)
        return data.user
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}