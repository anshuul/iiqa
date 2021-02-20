import { auth, firestore } from '../shared/firebase'

const Classroom = firestore.collection('classrooms')
const Avatar = firestore.collection('avatars')

export async function loadClassroomForStudents(userId){
    /**
     * @param userId ... the docid of user
     * 
     * @return listOfClassrooms
     * 
     * from docid get the list of classrom user is part of
     */
    console.log(userId)
    let responseData = null
    const listOfClassrooms = await Classroom.where('studentIds', 'array-contains', userId).get()
    if(listOfClassrooms.empty){
        throw new Error('No classroom found')
    }
    listOfClassrooms.forEach(classroom => {
        console.log(classroom.data())
        responseData = {docId: classroom.id, ...classroom.data()}
    })
    console.log(responseData)
    return !Array.isArray(responseData) ? [responseData] : responseData
}

export async function loadClassroomsForTeacher(userId){
   /**
     * @param userId ... the docid of user
     * 
     * @return listOfClassrooms
     * 
     * from docid get the list of classrom user is part of
     */
    console.log(userId)
    let responseData = []
    const listOfClassrooms = await Classroom.where('teacherId', '==', userId).get()
    if(listOfClassrooms.empty){
        throw new Error('No classroom found')
    }
    listOfClassrooms.forEach(classroom => {
        console.log(classroom.data())
        responseData = [...responseData, {docId: classroom.id, ...classroom.data()}]
    })
    console.log(responseData)
    return responseData 
}

export async function getAvatarImageLinks(){
    /**
     * @return list of image links of all stored avatars from db
     */
    const listOfAvatars = await Avatar.get()
    if(listOfAvatars.empty){
        throw new Error('No Avatar present')
    }
    let responseData = []
    listOfAvatars.forEach(avatarDoc => {
        console.log(avatarDoc.data())
        responseData = [...responseData, avatarDoc.data().imageLink]
    })
    return responseData
}
