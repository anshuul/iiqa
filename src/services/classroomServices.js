import { dbAPI } from '../shared/utils'

export async function loadClassroomForStudents(userId){
    /**
     * @param userId ... the docid of user
     * 
     * @return listOfClassrooms
     * 
     * from docid get the list of classrom user is part of
     */
    try {
        const { data } = await dbAPI.get(`/classrooms/?studentDocId=${userId}`)
        console.log(data.classrooms)
        return data.classrooms
    } catch (err) {
        throw new Error(err.response.data.error)
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
        const { data } = await dbAPI.get(`/classrooms/?teacherDocId=${userId}`)
        return data.classrooms
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

export async function getAvatarImageLinks(){
    /**
     * @return list of image links of all stored avatars from db
     */
     try {
        const {data} = await dbAPI.get(`/avatars`)
        return data.avatars
    } catch (err) {
        throw new Error(err.response.data.error)
    }
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
        const {data} = await dbAPI.post(`/classrooms`, {
            name, color, displayPicture, teacherDocId:teacherId
        })
        return data.message
    } catch (err) {
        console.log(err.response)
        throw new Error( err.response.data.error)
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
    const {data} = await dbAPI.patch(`/classrooms/${code}`, {
        studentDocId:studentId
    })
    return data.message
    } catch (err) {
        console.log(err.response)
        throw new Error( err.response.data.error)
    }
}

export async function getClassroomData(classroomDocId){
    /**
     * @param classroomDocId
     * 
     * @return complete data of classroom
     */

    try {
        const {data} = await dbAPI.get(`/classrooms/${classroomDocId}`)
        let { classroomData } = data
        classroomData.name = classroomData.name.toUpperCase()
        return classroomData
    } catch (err) {
        console.log(err.response)
        throw new Error( err.response.data.error)
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