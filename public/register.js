const container = document.querySelector('.container');
const videoContainer = document.querySelector('.videoContainer');
const section = document.querySelector('section');
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const btn = document.getElementById('btn');
const uploadPhoto = document.getElementById('uploadPhoto');
const takePhoto = document.getElementById('takePhoto');
const photos = document.querySelector('.photos');
const buttons = document.querySelector('.buttons')
const faCamera = document.querySelector('.camera');
const faCheck = document.querySelector('.check');

let localStream = null;

let booleanTakePhoto = true;

takePhoto.addEventListener('click', (e) => {
    console.log('dasda')
    e.preventDefault();
    if (booleanTakePhoto) {

        booleanTakePhoto = false;

        let video = document.createElement('video');
        video.setAttribute('width', '640');
        video.setAttribute('height', '480');
        video.autoplay = 'true';
        video.muted = 'true';
        videoContainer.appendChild(video);
        container.classList.add('active');
        videoContainer.classList.add('active');


        const cameraBtn = document.createElement('button');
        cameraBtn.classList.add('camera');
        buttons.appendChild(cameraBtn);
        const faCamera = document.createElement('i');
        faCamera.classList.add('fa-solid');
        faCamera.classList.add('fa-camera');
        cameraBtn.appendChild(faCamera);

        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check');
        buttons.appendChild(checkBtn);
        const faCheck = document.createElement('i');
        faCheck.classList.add('fa-solid');
        faCheck.classList.add('fa-check');
        checkBtn.appendChild(faCheck);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close');
        buttons.appendChild(closeBtn);
        const faClose = document.createElement('i');
        faClose.classList.add('fa-solid');
        faClose.classList.add('fa-close');
        closeBtn.appendChild(faClose);

        const camera = document.querySelector('.camera');
        const check = document.querySelector('.check');
        const close = document.querySelector('.close');

        cameraBtn.classList.add('active')
        cameraBtn.classList.add('available')

        checkBtn.classList.add('active')
        checkBtn.classList.add('available')

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

        let booleanCam = true;
        camera.addEventListener('click', () => {

            if (booleanCam) {

                booleanCam = false;
                camera.classList.toggle('cliked')

                var canvasEL = document.createElement('canvas');
                videoContainer.appendChild(canvasEL);
                canvasEL.classList.add('canvas')
                canvasEL.setAttribute('width', '640');
                canvasEL.setAttribute('height', '480');
                const canvas = document.querySelector('.canvas');
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, 650, 490);

                check.addEventListener('click', () => {
                    booleanTakePhoto = true;
                    booleanCam = true;
                    const a = document.createElement("a");
                    videoContainer.appendChild(a);
                    a.href = canvasEL.toDataURL();
                    a.download = 'image';
                    a.click();
                    videoContainer.removeChild(a);
                    del()
                })

            }

        })

        close.addEventListener('click', () => {
            booleanTakePhoto = true;
            stopStreamedVideo();
            del()
        })

        function stopStreamedVideo() {
            video.pause();
            video.srcObject = null;
            localStream.getTracks().forEach(track => {
                track.stop();
            });

            const videos = document.querySelectorAll('video');
            videos.forEach(e => {
                videoContainer.removeChild(e);
            })

            container.classList.remove('active');
            videoContainer.classList.remove('active');
            camera.classList.remove('active');
            check.classList.remove('active');
            const buttonss = document.querySelectorAll('.available');
            buttonss.forEach(e => {
                buttons.removeChild(e)
            })
        }

        function del() {
            const elements = document.querySelectorAll('.canvas')
            elements.forEach(e => {
                videoContainer.removeChild(e);
            })
        }

    }


})






// function checkInputs() {
//     // trim to remove the whitespaces
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();
//     const password2Value = password2.value.trim();

//     if (usernameValue === '') {
//         setErrorFor(username, 'Username cannot be blank');
//     } else {
//         setSuccessFor(username);
//     }

//     if (emailValue === '') {
//         setErrorFor(email, 'Email cannot be blank');
//     } else if (!isEmail(emailValue)) {
//         setErrorFor(email, 'Not a valid email');
//     } else {
//         setSuccessFor(email);
//     }

//     if (passwordValue === '') {
//         setErrorFor(password, 'password cannot be blank');
//     } else {
//         setSuccessFor(password)
//     }
//     if (password2Value === '') {
//         setErrorFor(password2, 'Password2 cannot be blank')
//     } else if (passwordValue !== password2Value) {
//         setErrorFor(password, 'Passwords does not match')
//         setErrorFor(password2, 'Passwords does not match')
//     } else {
//         setSuccessFor(password2)
//     }
//     const images = document.querySelectorAll('.image');
//     images.forEach(e => {
//         if (e.value === '') {
//             setErrorFor(e, 'You should choose or take a picture')
//         } else {
//             setSuccessFor(e)
//         }

//     })
//     return checkError();

// }

// function setErrorFor(input, message) {
//     const formControl = input.parentElement; //form-control
//     const small = formControl.querySelector('small');
//     small.innerText = message;
//     formControl.className = 'form-control error';
// }

// function setSuccessFor(input) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control success';
// }

// function checkError() {
//     const errors = document.querySelectorAll('.error');
//     if (errors.length > 0) {
//         return 1;
//     } else {
//         return 0;
//     }
// }

// function isEmail(email) {
//     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// }