import React, { useCallback, useEffect, useRef } from "react";
import { TinyFaceDetectorOptions, detectAllFaces, draw, matchDimensions, resizeResults } from "face-api.js";

// Hooks
import useFaceApiContext from "../VideoRecognitionContext/use-context-hook";

// Utils
import { canvasUtils, faceApiUtils } from "../../utils";

// Types
import type { FaceDetectorOptions } from "./types"

export default function useFaceDetector(
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    {
        fps = 30,
        enabled = true,
        faceMatcherThreshold = 0.4,
    }: FaceDetectorOptions = {}
) {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const { hasFaceApiLoaded, labels } = useFaceApiContext();

    const initializeDetection = useCallback(() => {
        const { current: video } = videoRef || {};

        if (!video || !hasFaceApiLoaded) {
            return;
        }

        const videoSize = {
            width: video.clientWidth,
            height: video.clientHeight
        }

        timer.current = setInterval(async () => {
            const { current: canvas } = canvasRef;
            if (!video || !canvas) {
                return;
            }

            const detections = await detectAllFaces(video, new TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors()

            const resizedDetections = resizeResults(detections, videoSize);

            matchDimensions(canvas, videoSize)
            canvasUtils.clearCanvas(canvas)

            if (labels.length) {
                faceApiUtils.drawFaceMatcherDetections(canvas, labels, resizedDetections, faceMatcherThreshold)
            }

            draw.drawDetections(canvas, resizedDetections);
        }, 1000 / fps)
    }, [fps, hasFaceApiLoaded])

    useEffect(() => {
        if (!enabled || timer.current) {
            return;
        }

        initializeDetection();

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        }
    }, [enabled, initializeDetection])

    return {
        hasFaceApiLoaded
    }
}