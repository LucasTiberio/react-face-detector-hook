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

```jsx
import { VideoRecognitionContextProvider } from "react-faceapi-detection-hook";

const App = () => {
  return (
    <VideoRecognitionContextProvider>
      {children}
    </VideoRecognitionContextProvider>
  )
};
```

props                | type       | defaultValue        | random example   | description                         |
---------------------|------------|---------------------|------------------|-------------------------------------|
faceApiModelsPath    | string     | "/facepi-models"    | "/models"        | public face-api models folder path  |

<br />

## Usage
```jsx
import { useFaceDetector } from "react-faceapi-detection-hook";

const MyAwesomeComponent = () => {
  const videoRef = useRef(null)

  const { detectedFaces } = useFaceDetector(videoRef, {
    enabled: true, // Default as true
    fps: 30, // Default as 30
  })

  return (
    <video ref={videoRef} />
  )
};
```

<br />

## Roadmap
- [ ] Create useWebcam hook to easily toggle navigator camera device.
- [ ] Add support to create face storage or upload it.
- [ ] Add callback on detect known face.


## License
MIT


## Author
- **Lucas Tiberio** - https://github.com/LucasTiberio
