import React, { useEffect, useState } from "react";

// Types
import type { WebcamOptions } from "./types";

export default function useWebcam(videoRef: React.RefObject<HTMLVideoElement | null>, userMediaOptions?: WebcamOptions) {
    const { enabled = true, video, audio } = userMediaOptions || {};

    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (initialized || !enabled || (!video && !audio)) {
            return;
        }

        const enableMediaStream = async () => {
            if (navigator.mediaDevices.getUserMedia === null || !videoRef?.current) {
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia(userMediaOptions)

                videoRef.current.srcObject = stream;
                videoRef.current.play();

                setError(null);
                setInitialized(true)
            } catch (error) {
                setInitialized(false)
                setError(error);
            }
        }

        enableMediaStream();
    }, [initialized, userMediaOptions])

    const getSnapshot = () => {
        if (!videoRef.current) {
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL('image/jpeg');
        return imageSrc;
    }

    return {
        error,
        initialized,
        getSnapshot,
    }
}
