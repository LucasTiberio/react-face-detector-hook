export type ContextProvider = ReactComponent & {
    faceApiModelsPath: string
}

export type Context = {
    hasFaceApiLoaded: boolean;
}