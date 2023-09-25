import React, { useCallback, useEffect, useRef } from "react";
import { TinyFaceDetectorOptions, detectAllFaces, draw, matchDimensions, resizeResults } from "face-api.js";

import useFaceApiContext from "../VideoRecognitionContext/use-context-hook";

import type { FaceDetectorOptions } from "./types"

export default function useFaceDetector(
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    options: FaceDetectorOptions = {}
) {
    const { enabled = true, fps = 30 } = options;

    const timer = useRef<NodeJS.Timeout | null>(null);

    const { hasFaceApiLoaded } = useFaceApiContext();

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
            if (!video) {
                return;
            }

            const detections = await detectAllFaces(
                video,
                new TinyFaceDetectorOptions()
            )

            const resizedDetections = resizeResults(detections, videoSize);
            const { current: canvas } = canvasRef;

            if (canvas) {
                matchDimensions(canvas, videoSize)
                canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
                draw.drawDetections(canvas, resizedDetections);
            }
        }, 1000 / fps)
    }, [fps, hasFaceApiLoaded])

    useEffect(() => {
        if (!enabled) {
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