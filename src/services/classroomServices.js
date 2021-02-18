import { auth, firestore } from '../shared/firebase'

const Classroom = firestore.collection('classrooms')

export async function loadClassroomForStudents(userId='SJq81PgMxBaM89nU3dG4'){
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
    let responseData = null
    const listOfClassrooms = await Classroom.where('teacherId', '==', userId).get()
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
