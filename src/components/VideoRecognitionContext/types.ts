import { LabeledFaceDescriptors } from "face-api.js";

type ImagePath = string
type Name = string

export type ImageLabels = Record<Name, ImagePath[]>

export type ContextProvider = ReactComponent & {
    faceApiModelsPath: string
    imageLabels: ImageLabels
}

export type Context = {
    hasFaceApiLoaded: boolean;
    labels: LabeledFaceDescriptors[]
}