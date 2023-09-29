import {
    loadFaceRecognitionModel,
    loadSsdMobilenetv1Model,
    loadTinyFaceDetectorModel,
    loadAgeGenderModel,
    loadFaceLandmarkModel,
} from 'face-api.js';

let isLoaded = false;

export default async function loadModels(path = "/faceapi-models") {
    if (isLoaded) {
        return;
    }

    try {
        await Promise.all([
            loadSsdMobilenetv1Model(path),
            loadFaceLandmarkModel(path),
            loadFaceRecognitionModel(path),
            loadTinyFaceDetectorModel(path),
            loadAgeGenderModel(path),
        ]);

        console.info("FaceApi: All needed models has been loaded")
        isLoaded = true;
    } catch (error) {
        console.error("FaceApi: Error while loading models", error)
        throw error
    }
};
