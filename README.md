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
npm install react-faceapi-detection-hook

# with yarn
yarn add react-faceapi-detection-hook

# with pnpm
pnpm add react-faceapi-detection-hook
```


## Demo
https://future.future/future


## Setup
In your root-level component, you have to add the provider.

The VideoRecognitionContextProvider does take an FaceApi instance and load its models passind the props down using the Context API.

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


## Roadmap
- [ ] Create useWebcam hook to toggle navigator camera devide.
- [ ] Add support to create face storage or upload it.
- [ ] Add callback on detect known face.


## License
MIT


## Author
- **Lucas Tiberio** - https://github.com/LucasTiberio
