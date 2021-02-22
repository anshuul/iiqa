import { auth, firestore } from '../shared/firebase'

const ImageSet = firestore.collection('imagesets')

export async function getImageSets(){
    /**
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