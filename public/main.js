const container = document.querySelector('.container')
let localStream = null;

Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'), //face model
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'), // face part like eye nose
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'), //recognise the where is the face
        faceapi.nets.faceExpressionNet.loadFromUri('./models') //happy smile
    ])
    .then(createButton())

function createButton() {
    const button = document.createElement('button');
    button.classList.add('start');
    button.innerText = 'Start'
    container.appendChild(button);

    const close = document.createElement('button');
    close.classList.add('stop');
    close.innerText = 'Stop'
    container.appendChild(close);
    const video = document.createElement('video');
    video.setAttribute('width', '640');
    video.setAttribute('height', '480');
    video.autoplay = 'true';
    video.muted = 'true';
    document.body.appendChild(video);

}
const btn = document.querySelector('.start')
const stop = document.querySelector('.stop')
btn.addEventListener('click', () => {
    navigator.getUserMedia({
            video: {}
        },
        stream => {
            localStream = stream;
            video.srcObject = stream;
        },
        err => console.log(err)
    );
})
const video = document.querySelector('video');
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    canvas.classList.add('canvas');
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 10)
})
stop.addEventListener('click', () => {
    const canvas = document.querySelector('.canvas');
    document.body.removeChild(canvas);
    video.pause();
    video.srcObject = null;
    localStream.getTracks().forEach(track => {
        track.stop();
    });
})