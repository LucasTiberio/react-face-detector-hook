import React, { useEffect, useMemo, useState } from "react";

import { loadModels } from "../../lib/face-api/loadModels";

import type { Context, ContextProvider } from "./types";

export const FaceApiContext = React.createContext<Context>({
    hasFaceApiLoaded: false,
})

export default function VideoRecognitionContextProvider({ children, faceApiModelsPath }: ContextProvider) {
    const [hasFaceApiLoaded, setFaceApiLoaded] = useState<boolean>(false);

    useEffect(() => {
        loadModels(faceApiModelsPath).then(() => {
            setFaceApiLoaded(true)
        });
    }, [])

    const contextValues: Context = useMemo(() => ({
        hasFaceApiLoaded,
    }), [hasFaceApiLoaded])
    
    return (
        <FaceApiContext.Provider value={contextValues}>
            {children}
        </FaceApiContext.Provider>
    )
}