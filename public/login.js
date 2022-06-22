    // Başlangıc Tanımlamaları...
    const faceIDResult = document.getElementById("face-id-button-text");
    const videoContainer = document.querySelector('.videoContainer')
    const container = document.querySelector('.container');
    const close = document.querySelector('.close');
    const buttons = document.querySelector('.buttons')


    // FaceID için Gereken Kod Bloğu...
    const localHost = 'http://localhost:5500/';
    const video = document.getElementById("video");
    let localStream = null;
    let isModelsLoaded = false;
    let LabeledFaceDescriptors = null;


    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(`${localHost}/models`),
        faceapi.nets.faceLandmark68Net.loadFromUri(`${localHost}/models`),
        faceapi.nets.faceRecognitionNet.loadFromUri(`${localHost}/models`),
        faceapi.nets.ssdMobilenetv1.loadFromUri(`${localHost}/models`)
    ]).then(initApp);
    async function initApp() {
        console.log('dasd')
        LabeledFaceDescriptors = await loadImages();
    }

    function loadImages() {
        const label = ["Munzur"];

        return Promise.all(
            label.map(async label => {
                const descriptions = [];
                for (let i = 1; i <= 1; i++) {
                    const img = await faceapi.fetchImage(
                        `${localHost}/admins/${label}/${i}.jpg`
                    );

                    const detections = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();
                    descriptions.push(detections.descriptor);
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        );
    }


    faceIDResult.addEventListener('click', () => {
        let video = document.createElement('video');
        video.setAttribute('width', '640');
        video.setAttribute('height', '480');
        video.autoplay = 'true';
        video.muted = 'true';
        videoContainer.appendChild(video);
        container.classList.add('active');
        videoContainer.classList.add('active');

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close');
        buttons.appendChild(closeBtn);
        const faClose = document.createElement('i');
        faClose.classList.add('fa-solid');
        faClose.classList.add('fa-close');
        closeBtn.appendChild(faClose);

        const close = document.querySelector('.close');
        closeBtn.classList.add('active')
        closeBtn.classList.add('available')


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