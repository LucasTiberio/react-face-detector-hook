import { LabeledFaceDescriptors, detectSingleFace, fetchImage } from "face-api.js"

// Types
import { ImageLabels } from "../../components/VideoRecognitionContext/types";

export default async function loadImageLabels(imageLabels: ImageLabels) {
    try {
        const getDescriptorsPromise = Object.keys(imageLabels).map(async (name) => {
            const images = imageLabels[name];
            const descriptors: Float32Array[] = []

            images.map(async image => {
                const faceApiImage = await fetchImage(image);
                const detection = await detectSingleFace(faceApiImage)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                if (detection?.descriptor) {
                    descriptors.push(detection.descriptor)
                }
            })

            // await Promise.all(images.map(async image => {
            //     const faceApiImage = await fetchImage(image);
            //     const detection = await detectSingleFace(faceApiImage)
            //         .withFaceLandmarks()
            //         .withFaceDescriptor()

            //         if (detection?.descriptor) {
            //             descriptors.push(detection.descriptor)
            //         }
            //     }))

            //     return new LabeledFaceDescriptors(name, descriptors);
            // })

            return new LabeledFaceDescriptors(name, descriptors);
        })

        const labeledFaceDescriptors = await Promise.all(getDescriptorsPromise);

        console.info("FaceApi: Image labels has been loaded")
        return labeledFaceDescriptors;
    } catch (error) {
        console.error("FaceApi: Error on loading image labels", error)
        throw error
    }
}