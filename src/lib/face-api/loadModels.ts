import {
    loadFaceRecognitionModel,
    loadSsdMobilenetv1Model,
    loadTinyFaceDetectorModel,
    loadAgeGenderModel,
} from 'face-api.js';

let isLoaded = false;

export const loadModels = async (path = "/faceapi-models") => {
    if (isLoaded) {
        return;
    }

    try {
        await Promise.all([
            loadFaceRecognitionModel(path),
            loadSsdMobilenetv1Model(path),
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
