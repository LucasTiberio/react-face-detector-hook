<div align="center">
  <img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*OiMm9fJ8QxD5hwXLF3UpQw.jpeg" alt="Face detection image" width="350">

  <h3 align="center">react-faceapi-detection-hook</h3>
  <p align="center">
    React hook to detect faces from your webcam or any video element using face-api.js
    <br />
    <a href="future.future">View Demo</a>
    ·
    <a href="https://justadudewhohacks.github.io/face-api.js/docs/">face-api.js</a>
  </p>
</div>

<br />
See http://caniuse.com/#feat=stream for browser compatibility.


## Installation
```shell
# with npm
npm i react-faceapi-detection-hook

# with yarn
yarn add react-faceapi-detection-hook

# with pnpm
pnpm i react-faceapi-detection-hook
```

<br />

## Demo
https://future.future/future

<br />

## Setup
### Download models
- In order to use face-api.js, we have to download the required models. You can find it [here](https://github.com/LucasTiberio/react-faceapi-detection-hook/tree/main/faceapi-models).

- Extract the "faceapi-models" folder inside your "public" directory.
  - You can give your folder any name you want. However, if you change, you will have to pass "faceApiModelsPath" prop to VideoRecognitionContextProvider (in the next step).


### React Context
In your root-level component, you have to add the provider.

The VideoRecognitionContext take an face-api instance to load its models passind the props down using the Context API.
Inside the Provider parent, you can make the requests, then pass the prop imageLabels

```jsx
import { VideoRecognitionContextProvider } from "react-faceapi-detection-hook";

const exampleImageLabels = {
  Fella: ["/assets/images/fella-1.png", "randomBase64"]
}

const App = () => {
  return (
    <VideoRecognitionContextProvider imageLabels={exampleImageLabels}>
      {children}
    </VideoRecognitionContextProvider>
  )
};
```

props                | type                     | defaultValue      | example                                                 | description                         |
---------------------|--------------------------|-------------------|---------------------------------------------------------|-------------------------------------|
imageLabels          | Record<string, string[]> |  []               | { PersonName: ["/images/person.png", "randomBase64"] }  | labels with respective images       |
faceApiModelsPath    | string                   |  "/facepi-models" | "/models"                                               | public face-api models folder path  |

<br />

## Usage
```jsx
import { useFaceDetector, FaceDetection, FaceMatcher, useCamera } from "react-faceapi-detection-hook";

const MyAwesomeComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /** If you want, we have a built-in hook to enable webcam */
  useCamera(videoRef, {
    audio: false,
    video: true,
  })

  useFaceDetector(videoRef, canvasRef, {
    fps: 60, // Default as 30,
    enabled: true, // Default as true
    faceMatcherThreshold: 0.4, // Default as 0.4,
    onRecognizeFace: (recognizedFace: FaceMatcher[]) => {
      console.log({ label: recognizedFace.label })
    }
  })

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }} />
      <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
    </>
  )
};
```

<br />

## Roadmap
- [X] Pushed first version for react-faceapi-detection-hook.
- [X] Create useWebcam hook to easily toggle navigator camera device.
- [x] Add support to inject "names" with its images.
- [x] Add face recognition based on injected labels.
- [x] Add callback on detect known face.
- [ ] Create demo.
- [ ] Create documentation.


## License
MIT


## Author
- **Lucas Tiberio** - https://github.com/LucasTiberio
