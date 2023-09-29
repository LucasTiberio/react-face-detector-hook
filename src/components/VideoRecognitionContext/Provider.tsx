import React, { useEffect, useMemo, useState } from "react";
import { LabeledFaceDescriptors } from "face-api.js";

// Lib
import { loadImageLabels, loadModels } from "../../lib/face-api";

// Types
import type { Context, ContextProvider } from "./types";

export const FaceApiContext = React.createContext<Context>({
    hasFaceApiLoaded: false,
    labels: [],
})

export default function VideoRecognitionContextProvider({ children, faceApiModelsPath, imageLabels = {} }: ContextProvider) {
    const [hasModelsLoaded, setModelsLoaded] = useState(false);
    const [hasLabelsLoaded, setLabelsLoaded] = useState(false)
    const [labels, setLabels] = useState<LabeledFaceDescriptors[]>([]);

    useEffect(() => {
        loadModels(faceApiModelsPath).then(() => {
            setModelsLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (!hasModelsLoaded) {
            return;
        }

        loadImageLabels(imageLabels).then(labels => {
            setLabels(labels)

            setLabelsLoaded(true)
        })
    }, [hasModelsLoaded])

    const contextValues: Context = useMemo(() => ({
        hasFaceApiLoaded: hasModelsLoaded || hasLabelsLoaded,
        labels,
    }), [hasModelsLoaded, hasLabelsLoaded, labels])
    
    return (
        <FaceApiContext.Provider value={contextValues}>
            {children}
        </FaceApiContext.Provider>
    )
}