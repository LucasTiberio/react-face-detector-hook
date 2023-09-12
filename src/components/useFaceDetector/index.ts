import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaceDetection, TinyFaceDetectorOptions, detectAllFaces, resizeResults } from "face-api.js";

import useFaceApiContext from "../VideoRecognitionContext/use-context-hook";

import type { FaceRecognitionOptions } from "./types"

export default function useFaceRecognition(
    videoRef: React.RefObject<HTMLVideoElement | null>,
    options: FaceRecognitionOptions = {}
) {
    const { enabled = true, fps = 30 } = options;

    const timer = useRef<NodeJS.Timeout | null>(null);
    const [detectedFaces, setDetectedFaces] = useState<FaceDetection[]>([]);

    const { hasFaceApiLoaded } = useFaceApiContext();

    const initializeDetection = useCallback(() => {
        timer.current = setInterval(async () => {
            if (!videoRef.current) {
                return;
            }

            const videoSize = {
                width: videoRef.current.clientWidth,
                height: videoRef.current.clientHeight
            }

            const detections = await detectAllFaces(
                videoRef.current,
                new TinyFaceDetectorOptions()
            )

            const resizedDetections = resizeResults(detections, videoSize);

            setDetectedFaces(resizedDetections);
        }, 1000 / fps)
    }, [videoRef, fps])

    useEffect(() => {
        if (!hasFaceApiLoaded || !enabled) {
            return;
        }

        initializeDetection();

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        }
    }, [hasFaceApiLoaded, enabled, initializeDetection])

    return {
        detectedFaces,
        loading: !!hasFaceApiLoaded
    }
}