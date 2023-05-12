let body = document.querySelector('.politics__privacy-text')
let textAnimation = document.querySelector('.politics__privacy-text-animation')
body.onscroll = function (e) {
    if (window.matchMedia('(max-width: 520px)').matches){
        if(body.scrollTop > body.scrollHeight-400) {
            textAnimation.classList.remove('politics__privacy-text')
        } else if (body.scrollTop < body.scrollHeight-400) {
            textAnimation.classList.add('politics__privacy-text')
        }
    } else {
        if(body.scrollTop > body.scrollHeight-700) {
            textAnimation.classList.remove('politics__privacy-text')
        } else if (body.scrollTop < body.scrollHeight-700) {
            textAnimation.classList.add('politics__privacy-text')
        }
    }
};
