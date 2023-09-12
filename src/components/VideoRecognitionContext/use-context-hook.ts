import React from "react";
import { FaceApiContext } from "./Provider";

export default function useFaceApiContext() {
    const faceApiContext = React.useContext(FaceApiContext);

    if (!faceApiContext) {
        console.error("You have to use FaceApiContextProvider to use the hook")
    }

    return faceApiContext;
}