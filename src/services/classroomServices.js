import { auth, firestore } from '../shared/firebase'
import { getOnlyUserProfile } from './userServices'

export const Classroom = firestore.collection('classrooms')
const Avatar = firestore.collection('avatars')

export async function loadClassroomForStudents(userId){
    /**
     * @param userId ... the docid of user
     * 
     * @return listOfClassrooms
     * 
     * from docid get the list of classrom user is part of
     */
    try {
        console.log(userId)
        let responseData = []
        const listOfClassrooms = await Classroom.where('studentIds', 'array-contains', userId).get()
        if(listOfClassrooms.empty){
            return []
        }
        listOfClassrooms.forEach(classroom => {
            console.log(classroom.data())
            responseData = [...responseData, {docId: classroom.id, ...classroom.data()}]
        })
        console.log(responseData)
        return responseData
    } catch (err) {
        throw new Error(err)
    }
}

export async function loadClassroomsForTeacher(userId){
   /**
     * @param userId ... the docid of user
     * 
     * @return listOfClassrooms
     * 
     * from docid get the list of classrom user is part of
     */
    try {
        console.log(userId)
        let responseData = []
        const listOfClassrooms = await Classroom.where('teacherId', '==', userId).get()
        if(listOfClassrooms.empty){
            return []
        }
        listOfClassrooms.forEach(classroom => {
            console.log(classroom.data())
            responseData = [...responseData, {docId: classroom.id, ...classroom.data()}]
        })
        console.log(responseData)
        return responseData 
    } catch (err) {
        throw new Error(err)
    }
}

export async function getAvatarImageLinks(){
    /**
     * @return list of image links of all stored avatars from db
     */
    const listOfAvatars = await Avatar.get()
    if(listOfAvatars.empty){
        return []
    }
    let responseData = []
    listOfAvatars.forEach(avatarDoc => {
        console.log(avatarDoc.data())
        responseData = [...responseData, avatarDoc.data().imageLink]
    })
    return responseData
}

export async function createNewClassroom(name, color, teacherId, displayPicture){
    /**
     * @param name
     * @param color
     * @param teacherId
     * @param displayPicture
     * 
     * @return success message for creation of clasroom
     * 
     * for new classroom studentIds will be []
     * get the doc id of user from uid
     * make a new doc in classroom collection with given data
     */

    try {
        const { docId } = await getOnlyUserProfile(teacherId)
        console.log(docId)
        await Classroom.add({
            name, color, teacherId: docId, studentIds:[], displayPicture
        })
        return 'New Classroom created'
    } catch (err) {
        throw new Error(err)
    }
}

export async function joinClassroom(code, studentId){
    /**
     * @param code this code is actually docId of classroom
     * @setudeId
     * 
     * @return success amessage on joining classroom
     * 
     * search for the classroom docid again given code
     * get docid of user from uid
     * add docid in array of studentIds of searched classroom
     */

    try {
        const classroomRef = Classroom.doc(code)
        const classroom = await classroomRef.get()
        if(!classroom.exists){
            throw new Error('No such Classroom of this code exists.')
        }
        const { docId } = await getOnlyUserProfile(studentId)
        if(classroom.data().studentIds.includes(docId)) {
            throw new Error('You are already a part of this classroom')
        }
        await classroomRef.set({
            ...classroom.data(), studentIds: [...classroom.data().studentIds, docId]
        })
        return 'Joined Classroom Successfully'
    } catch (err) {
        throw new Error(err)
    }
}

export async function getClassroomData(docId){
    /**
     * @param docId
     * 
     * @return complete data of classroom
     */

    try {
        const classroomRef = Classroom.doc(docId)
        const classroom = await classroomRef.get()
        if(!classroom.exists){
            throw new Error('No such Classroom of this code exists.')
        }
        return {docId, ...classroom.data()}
    } catch (err) {
        throw new Error(err)
    }
}

export function encryptInformationForRouting(info1, info2){
    /**
     * @param info1 
     * @param info2 
     * 
     * @return encrypted version of given information
     */

    let encryptedVersion = ''
    for(let i = 0; i < info1.length; i++){
        encryptedVersion += info1[i] + info2[i]
    }
    console.log(encryptedVersion)
    return encryptedVersion
}

export function decryptInformationAfterRouting(encryptedVersion){
    /**
     * @param encryptedVersion
     * 
     * @return orinal information
     */

    let info1 = '', info2 = ''
    for(let i = 0; i < encryptedVersion.length; i+=2){
        info1 += encryptedVersion[i]
        info2 += encryptedVersion[i+1]
    }
    console.log(info1,' ', info2)
    return [info1, info2]
}