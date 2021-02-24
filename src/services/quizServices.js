import { auth, firestore } from '../shared/firebase'
import { getClassroomData } from './classroomServices'

const ImageSet = firestore.collection('imagesets')
const PredefinedImageSetsListRef = ImageSet.doc('predefinedImageSets')

export function getPromiseForFetchingImageSet(classroomDocId){
    return Promise.all([getImageSet(ImageSet), getImageSet(firestore.collection(`classrooms/${classroomDocId}/imagesets`))])
}

export async function getImageSet(ImageSet){
    /**
     * @param docId
     * 
     * @return returns all the image sets
     */

    try {
        const imageSetsList = await ImageSet.get()
        if(imageSetsList.empty){
            throw new Error('No image sets present')
        }
        let imageSetResponse = []
        imageSetsList.forEach(imageSet => {
            imageSetResponse.push({ docId: imageSet.id, ...imageSet.data() })
        })
        return imageSetResponse
    } catch (err) {
        throw new Error(err)
    }
}

export async function getPredefinedImageSets(){
    /**
     * @return all the predefined image sets list
     * 
     * get the docId from the list
     * get data of each image set
     */

    try {
        const predefinedImageSetsDocIds = await PredefinedImageSetsListRef.get()
        if(!predefinedImageSetsDocIds.exists){
            return []
        }
        console.log(predefinedImageSetsDocIds.data())
        let predefinedImageSets = []
        predefinedImageSetsDocIds.data().imageSetsDocIds.forEach(async docId => {
            const eachImageSet = await getImageSet(docId)
            predefinedImageSets.push(eachImageSet)
        })
        return predefinedImageSets
    } catch (err) {
        throw new Error(err)
    }
}

export async function getClassroomImageSet(classroomDocId){
    /**
     * @param classroomDocId
     * 
     * @return imagesets of the given classroom
     * 
     * get the list of all docIds of imagesets
     * get imageset for each docid
     */

    try {
        const classroomData = await getClassroomData(classroomDocId)
        console.log(classroomData.hasOwnProperty('imageSetsDocIds'))
        if(!classroomData.hasOwnProperty('imageSetsDocIds') || !classroomData.imageSetsDocIds){
            return []
        }
        let classroomImageSets = []
        classroomData.imageSetsDocIds.forEach(async docId => {
            const eachImageSet = await getImageSet(docId)
            classroomImageSets.push(eachImageSet)
        })
        return classroomImageSets
    } catch (err) {
        throw new Error(err)
    }
}