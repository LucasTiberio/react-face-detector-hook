import { FaceDetection, FaceLandmarks68, FaceMatch, FaceMatcher, LabeledFaceDescriptors, WithFaceDescriptor, WithFaceLandmarks, draw } from "face-api.js";

// Types
type Detection = WithFaceDescriptor<WithFaceLandmarks<{
    detection: FaceDetection;
}, FaceLandmarks68>>

const filterUnknownLabel = ({ label }: FaceMatch) => label.toLowerCase() !== "unknown"

const drawFaceMatcherDetections = (
    canvas: HTMLCanvasElement,
    labels: LabeledFaceDescriptors[],
    detections: Detection[],
    faceMatcherThreshold: number,
    onRecognizeFace?: (recognizedFaces: FaceMatch[]) => void,
) => {
    const faceMatcher = new FaceMatcher(labels, faceMatcherThreshold)

    const recognizedFaces = detections.map(
        detection => faceMatcher.findBestMatch(detection.descriptor)
    ).filter(filterUnknownLabel)

    if (recognizedFaces.length) {
        onRecognizeFace?.(recognizedFaces)
    }

    recognizedFaces.forEach((recognizedFace, index) => {
        const { label: name, distance: fidelity } = recognizedFace;
        const detection = detections[index];
        const { box } = detection.detection

        new draw.DrawTextField([
            `${name}: ${(fidelity * 100).toFixed(2)}`
        ], box.bottomLeft).draw(canvas)
    })
}

export default {
    drawFaceMatcherDetections
}