import { auth, firestore, storage } from "../shared/firebase";
import { getClassroomData, Classroom } from "./classroomServices";
import { getProfileDataFromDocId } from "./userServices";

const ImageSet = firestore.collection("imagesets");
const PredefinedImageSetsListRef = ImageSet.doc("predefinedImageSets");
const Quiz = firestore.collection("quizzes");

export function getPromiseForFetchingImageSet(classroomDocId) {
  return Promise.all([
    getImageSet(ImageSet),
    getImageSet(firestore.collection(`classrooms/${classroomDocId}/imagesets`)),
  ]);
}

export async function getImageSet(ImageSet) {
  /**
   * @param docId
   *
   * @return returns all the image sets
   */

  try {
    const imageSetsList = await ImageSet.get();
    if (imageSetsList.empty) {
      return [];
    }
    let imageSetResponse = [];
    imageSetsList.forEach((imageSet) => {
      imageSetResponse.push({ docId: imageSet.id, ...imageSet.data() });
    });
    return imageSetResponse;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPredefinedImageSets() {
  /**
   * @return promise that resolves to imagesets
   *
   * call getImageSet method with admin imageset
   */

  return getImageSet(ImageSet);
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

  return getImageSet(
    firestore.collection(`classrooms/${classroomDocId}/imagesets`)
  );
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
    // TODO: set parameter for maximum no of images allowed
    if (imageLinks.length === 0) {
      throw new Error("Please select some images");
    }
    const subCollectionForImageSet = firestore.collection(
      `classrooms/${docId}/imagesets`
    );
    const imageSetName = new Date().toDateString().slice(4);
    await subCollectionForImageSet.add({
      name: imageSetName,
      imageLinks,
    });
    return "Collection saved successfully";
  } catch (err) {
    throw new Error(err);
  }
}

function processImageSetsLinksForAPI(imageLinks) {
  let resp = "['";
  for (let i = 0; i < imageLinks.length - 1; i++) {
    resp += imageLinks[i] + "', '";
  }
  resp += imageLinks[imageLinks.length - 1] + "']";
  return resp;
}

export async function dummy(imageSets) {
  const respObj = {
                    answer: {
                      correct_answer: "yes",
                      options: ["yes", "no"],
                    },
                    image_path:
                      "https://firebasestorage.googleapis.com/v0/b/iiqa-dev.appspot.com/o/misc%2Fbaby.jpeg?alt=media",
                    question: " is the baby happy ?",
                  }
  const resp = imageSets.map(_ => respObj)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        result: resp
      });
    }, [1000]);
  });
}

export async function getQuizData(imageSets) {
  /**
   * @param imageSets
   *
   * @response quiz question and answers
   *
   */

  const imageLinks = processImageSetsLinksForAPI(imageSets);
  const jsonReq = JSON.stringify({
    image_url_array: imageLinks,
  });
  console.log(jsonReq);

  const quizApiResponse = await fetch("http://127.0.0.1:100/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: jsonReq, // body data type must match "Content-Type" header
  });

  return quizApiResponse.json();
}

export async function createNewQuiz(quizData, classroomDocId) {
  /**
   * @param quizData set of quistion answrs and imageLinks to be stored
   * @param classroomDocId
   *
   * @return return quiz docId
   */

  try {
    var currentdate = new Date();
    const { id: quizDocId } = await firestore
      .collection(`classrooms/${classroomDocId}/quizzes`)
      .add({
        dateTimeOfCreation: currentdate,
        quizData: JSON.stringify(quizData),
      });

    return quizDocId;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getQuizzesForClassroom(classroomDocId) {
  /**
   * @param classroomDocId
   *
   * @return array of quizzes and data
   */

  try {
    const listOfQuizzesResp = await firestore
      .collection(`classrooms/${classroomDocId}/quizzes`)
      .get();
    if (listOfQuizzesResp.empty) return [];

    const arrayOfQuizData = [];
    listOfQuizzesResp.forEach((eachQuizData) => {
      arrayOfQuizData.push({ docId: eachQuizData.id, ...eachQuizData.data() });
    });
    return arrayOfQuizData;
  } catch (err) {
    throw new Error(err);
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
    console.log(classroomDocId, quizDocId, studentDocId, score, outOffScore);
    const { id: attendeeDocId } = await firestore
      .collection(`classrooms/${classroomDocId}/quizzes/${quizDocId}/attendees`)
      .add({
        studentDocId,
        score: `${score}/${outOffScore}`,
      });

    return "Your score saved";
  } catch (err) {
    throw new Error(err);
  }
}

export async function getFilteredActivitiesAccToStudent(
  arrayOfQuizActvities,
  studentId,
  classroomDocId
) {
  /**
   * @param arrayOfQuizActvities
   * @param studentId
   *
   * @return filtered data set
   */

  try {
    console.log(arrayOfQuizActvities);
    console.log(studentId);
    let filteredArrayOfQuizActivities = [];
    for (const quizActivity of arrayOfQuizActvities) {
      const listOfAttendeesResp = await firestore
        .collection(
          `classrooms/${classroomDocId}/quizzes/${quizActivity.docId}/attendees`
        )
        .get();
      if (listOfAttendeesResp.empty) {
        console.log(arrayOfQuizActvities);
        filteredArrayOfQuizActivities.push(quizActivity);
      } else {
        listOfAttendeesResp.forEach((attendeeData) => {
          console.log(attendeeData.data());
          if (attendeeData.data().studentDocId !== studentId) {
            console.log(quizActivity);
            filteredArrayOfQuizActivities.push(quizActivity);
          }
          console.log(filteredArrayOfQuizActivities);
        });
      }
    }
    return filteredArrayOfQuizActivities;
  } catch (err) {
    throw new Error(err);
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
    const listOfAttendeesResp = await firestore
      .collection(`classrooms/${classroomDocId}/quizzes/${quizDocId}/attendees`)
      .get();
    if (listOfAttendeesResp.empty) {
      return [];
    }
    let attendeesDataArray = [];
    listOfAttendeesResp.forEach(async (attendee) => {
      attendeesDataArray.push({ docId: attendee.id, ...attendee.data() });
    });
    return attendeesDataArray;
  } catch (err) {
    throw new Error(err);
  }
}

export async function isStudentEligibleForQuiz(
  classroomDocId,
  quizDocId,
  studentId
) {
  try {
    const listOfAttendeesResp = await firestore
      .collection(`classrooms/${classroomDocId}/quizzes/${quizDocId}/attendees`)
      .where('studentDocId', '==', studentId)
      .get();
    if(listOfAttendeesResp.empty)
      return true
    else
      return false
  } catch (err) {
    throw new Error(err);
  }
}


export async function getGeneratedQuiz(classroomDocId, quizDocId){
  /**
   * @param classroomDocId
   * @param quizDocId
   * 
   * @return quiz data for the given classroom and quiz id
   */

  try {
    const quizObj = await firestore.collection(`classrooms/${classroomDocId}/quizzes`).doc(quizDocId).get()
    if(!quizObj.exists){
      throw new Error('No quiz found')
    }
    let { quizData, dateTimeOfCreation } = quizObj.data()
    quizData = JSON.parse(quizData)
    const dateTimeObj = dateTimeOfCreation.toDate()
    dateTimeOfCreation = `${dateTimeObj.toDateString()} ${dateTimeObj.toLocaleTimeString()}`
    return { dateTimeOfCreation, quizData }
  } catch (err) {
    throw new Error(err)
  }
}

function getFirebaseFileUrl(fileName){
  return `https://firebasestorage.googleapis.com/v0/b/iiqa-dev.appspot.com/o/uploadedImages%2F${fileName}?alt=media`
}

export async function uploadImagesToFirebaseStorage(imageFiles){
  /**
   * @param imageFiles
   * 
   * @return array of urls
   */

  try {

    if(imageFiles.length === 0){
      return []
    }

    const filesNamesArr = imageFiles.map(file => {
      const ogFileName = file.name
      const nameOfFile = ogFileName.slice(0,ogFileName.lastIndexOf('.'))
      const ext = ogFileName.slice(ogFileName.lastIndexOf('.'))
      const uniquePart = new Date().toDateString().split(' ').join('')
      const modifiedfileName = `${nameOfFile}${uniquePart}${ext}`
      return modifiedfileName
    })

    const uploadTasks = imageFiles.map((file, index) => {
      console.log(filesNamesArr[index])
      return storage.ref(`/uploadedImages/${filesNamesArr[index]}`).put(file)
    })    

    const snapshotArr = await Promise.all(uploadTasks)
    if(snapshotArr.length === uploadTasks.length){
      return filesNamesArr.map(fileName => getFirebaseFileUrl(fileName))
    } else {
      throw new Error('Could not upload all the files')
    }

  } catch (err) {
    throw new Error(err)
  }
}