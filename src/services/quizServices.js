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
            return []
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
     * @return promise that resolves to imagesets
     * 
     * call getImageSet method with admin imageset
     */

    return getImageSet(ImageSet)
}

export async function getClassroomImageSet(classroomDocId){
    /**
     * @param classroomDocId
     * 
     * @return promise that resolves to metioned classroom iamgesets
     * 
     * get the docId of classroom
     * get the subcolection path
     * call getImageSt method with the Imageset formed
     */

    return getImageSet(firestore.collection(`classrooms/${classroomDocId}/imagesets`))
}

export async function createImageSetForClassroom(docId, imageLinks){
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
        if(imageLinks.length === 0){
            throw new Error('Please select some images')
        }
        const subCollectionForImageSet = firestore.collection(`classrooms/${docId}/imagesets`)
        const imageSetName = new Date().toUTCString()
        await subCollectionForImageSet.add({
            name: imageSetName,
            imageLinks,
        })
        return 'Collection saved successfully'
    } catch (err) {
        throw new Error(err)
    }
}