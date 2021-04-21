import { date } from "yup";
import { storage } from "../shared/firebase";

import { dbAPI, capitalize, getTokenizedHeader } from '../shared/utils'

export function getPromiseForFetchingImageSet(classroomDocId) {
  return Promise.all([
    getPredefinedImageSets(),
    getClassroomImageSet(classroomDocId)
  ]);
}

export async function getPredefinedImageSets() {
  /**
   * @return promise that resolves to imagesets
   *
   * call getImageSet method with admin imageset
   */

  try {
    const { data } = await dbAPI.get(`/imagesets`, getTokenizedHeader())
    return data.imageSets
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

export async function getClassroomImageSet(classroomDocId) {
  /**
   * @param classroomDocId
   *
   * @return promise that resolves to metioned classroom iamgesets
   *
   * get the docId of classroom
   * get the subcolection path
   * call getImageSt method with the Imageset formed
   */

  try {
    const { data } = await dbAPI.get(`/classrooms/${classroomDocId}/imagesets`, getTokenizedHeader())
    return data.imageSets
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

export async function createImageSetForClassroom(docId, imageLinks) {
  /**
   * @param docId docID of classroom
   * @imageLinks links of image to be saved
   *
   * @return success message
   *
   * creat document with imagelinks
   * set name to be the current day
   * displaypicture wil be bydefault taken as the first image
   */

   try {
    const { data } = await dbAPI.post(`/classrooms/imagesets`, {
      classroomDocId:docId, imageLinks
    }, getTokenizedHeader())
    return data.message
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

export async function getQuizData(imageSets) {
  /**
   * @param imageSets
   *
   * @response quiz question and answers
   *
   */

   try {
    console.log(imageSets)
    const { data } = await dbAPI.post(`/classrooms/quizzes/?generate=True`, {
      imageLinksArray: imageSets,
      dateTime: Date.now()
    }, getTokenizedHeader())
    console.log(data)
    return data
    } catch (err) {
      console.log(err.response)
      throw new Error(err.response.data.error)
    }
}

export async function createNewQuiz(quizData, classroomDocId, quizName) {
  /**
   * @param quizData set of quistion answrs and imageLinks to be stored
   * @param classroomDocId
   * @param quizName
   *
   * @return return quiz docId
   */

   try {
    const { data } = await dbAPI.post(`/classrooms/quizzes`, {
      classroomDocId, quizData, quizName
    }, getTokenizedHeader())
    return data.quizDocId
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

export async function getQuizzesForClassroom(classroomDocId) {
  /**
   * @param classroomDocId
   *
   * @return array of quizzes and data
   */

   try {
    const { data } = await dbAPI.get(`/classrooms/${classroomDocId}/quizzes`, getTokenizedHeader())
    return data.quizzes
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

export async function saveQuizScore(
  classroomDocId,
  quizDocId,
  studentDocId,
  score,
  outOffScore
) {
  /**
   * @param classroomDocId
   * @param quizDocId
   * @param studentDocId
   *
   * @return sucess message on saving the score
   */

   try {
    const { data } = await dbAPI.post(`/classrooms/quizzes/attendees`, {
      classroomDocId, quizDocId, studentDocId, score, outOffScore
    }, getTokenizedHeader())
    return data.message
    } catch (err) {
        throw new Error(err.response.data.error)
    }
}

export async function getAttendeesAndScores(classroomDocId, quizDocId) {
  /**
   * @param classroomDocId
   * @param quizDocId
   *
   * @return attendee name and score
   */

  try {
    const { data } = await dbAPI.get(`/classrooms/${classroomDocId}/quizzes/${quizDocId}/attendees`, getTokenizedHeader())
    return data.attendees
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

export async function isStudentEligibleForQuiz(
  classroomDocId,
  quizDocId,
  studentId
) {
  try {
    const { data } = await dbAPI.get(`/classrooms/${classroomDocId}/quizzes/${quizDocId}/attendees/${studentId}?eligibilityCheck=True`, getTokenizedHeader())
    return Number(data.eligibilityStatus)
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

export const capitalizeQuizData = (quizData) => {
  quizData = quizData.map(eachQuizData => {
    let { question, answer, ...rest } = eachQuizData
    question = capitalize(question.trim())
    let { correct_answer, options } = answer
    correct_answer = capitalize(correct_answer)
    options = options.map(eachOption => capitalize(eachOption))
    answer = {correct_answer, options}
    return { question, answer, ...rest }
  })
  return quizData
}

export async function getGeneratedQuiz(classroomDocId, quizDocId){
  /**
   * @param classroomDocId
   * @param quizDocId
   * 
   * @return quiz data for the given classroom and quiz id
   */

  try {
    let { data } = await dbAPI.get(`/classrooms/${classroomDocId}/quizzes/${quizDocId}`, getTokenizedHeader())
    let { quizData, ...rest } = data.quizData
    quizData = capitalizeQuizData(quizData)
    data.quizData = {quizData, ...rest}
    return data.quizData
  } catch (err) {
      throw new Error(err.response.data.error)
  }
}

function getFirebaseFileUrl(fileName){
  return `https://firebasestorage.googleapis.com/v0/b/iiqa-dev.appspot.com/o/uploadedImages%2F${fileName}?alt=media`
}

// function getImageBlobs(imageFiles){
//   const blobConversionTask = imageFiles.map(imageFile => fetch(imageFile).then(res => res.blob()))
//   return Promise.all(blobConversionTask)
// }

export async function uploadImagesToFirebaseStorage(imageFiles){
    try {
      let formData = new FormData()
      imageFiles.forEach((imageFile, index) => {
        formData.append(`images`, imageFile)
      })
      // formData.append('images', imageFiles)
      const headers = {headers:{'Content-Type': 'multipart/form-data',...getTokenizedHeader().headers }}
      let { data } = await dbAPI.post('/storage/', formData, headers)
      console.log(data)
      return data.uploadedFilesURLs
    } catch (err) {
      console.log(err)
      throw new Error(err.response.data.error)
    }
}

// export async function uploadImagesToFirebaseStorage(imageFiles){
//   /**
//    * @param imageFiles
//    * 
//    * @return array of urls
//    */

//   try {

//     if(imageFiles.length === 0){
//       return []
//     }

//     const filesNamesArr = imageFiles.map(file => {
//       let ogFileName = file.name
//       ogFileName = ogFileName.split(' ').join('')
//       const nameOfFile = ogFileName.slice(0,ogFileName.lastIndexOf('.'))
//       const ext = ogFileName.slice(ogFileName.lastIndexOf('.'))
//       const uniquePart = new Date().toDateString().split(' ').join('')
//       const modifiedfileName = `${nameOfFile}${uniquePart}${ext}`
//       return modifiedfileName
//     })

//     const uploadTasks = imageFiles.map((file, index) => {
//       console.log(filesNamesArr[index])
//       return storage.ref(`/uploadedImages/${filesNamesArr[index]}`).put(file)
//     })    

//     const snapshotArr = await Promise.all(uploadTasks)
//     if(snapshotArr.length === uploadTasks.length){
//       return filesNamesArr.map(fileName => getFirebaseFileUrl(fileName))
//     } else {
//       throw new Error('Could not upload all the files')
//     }

//   } catch (err) {
//     throw new Error(err)
//   }
// }