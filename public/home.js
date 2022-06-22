var typed = new Typed(".auto-input", {
    strings: ["Recognition", "Expression Recognition", "Landmark Detection", "Realtime Tracking"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true
})


function scroll() {
    var content = document.querySelectorAll('.text');
    var img = document.querySelectorAll('img')
    content.forEach((e) => {
        const position = e.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        if (position < screenPosition) {
            e.classList.add('active');
        } else if (position > screenPosition) {
            e.classList.remove('active')
        }
    })
    img.forEach((e) => {
        const position = e.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        if (position < screenPosition) {
            e.classList.add('active');

        } else if (position > screenPosition) {
            e.classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scroll)