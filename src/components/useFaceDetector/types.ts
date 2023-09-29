import { FaceMatch } from "face-api.js";

export type FaceDetectorOptions = {
    onRecognizeFace?: (recognizedFaces: FaceMatch[]) => Promise<void> | void
    faceMatcherThreshold?: number;
    enabled?: boolean;
    fps?: number;
}