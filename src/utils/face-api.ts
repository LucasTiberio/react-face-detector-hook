import { FaceDetection, FaceLandmarks68, FaceMatcher, LabeledFaceDescriptors, WithFaceDescriptor, WithFaceLandmarks, draw } from "face-api.js";

// Types
type Detections = WithFaceDescriptor<WithFaceLandmarks<{
    detection: FaceDetection;
}, FaceLandmarks68>>[]

const drawFaceMatcherDetections = (canvas: HTMLCanvasElement, labels: LabeledFaceDescriptors[], detections: Detections, faceMatcherThreshold: number) => {
    const faceMatcher = new FaceMatcher(labels, faceMatcherThreshold)
    const recognizedFaces = detections.map(
        detection => faceMatcher.findBestMatch(detection.descriptor)
    )

    recognizedFaces.forEach((recognizedFace, index) => {
        const { label: name, distance: fidelity } = recognizedFace;
        const { box } = detections[index].detection;

        new draw.DrawTextField([
            `${name}: ${(fidelity * 100).toFixed(2)}`
        ], box.bottomLeft).draw(canvas)
    })
}

export default {
    drawFaceMatcherDetections
}