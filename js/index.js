const openForm = document.querySelectorAll('.call')
const closeSucc = document.querySelector('.form__close')
const closeForm = document.querySelectorAll('.form__cross')
const formModal = document.querySelector('.form')
const formWrap = document.querySelector('.form__wrap')
const phoneInput = document.getElementById('inputPhone');
const nameInput = document.getElementById('inputUsername')
const errorLabel = document.getElementById('errorLabelPhone');

function changeStyles(inputId) {
    const input = document.getElementById(inputId);

    if (input.value.length > 0) {
        input.classList.add("form__input-type");
        input.classList.remove("form__input-focus");
        input.classList.remove("form__input");
        input.classList.remove("form__input-error");
    } else if (input.classList.contains("form__input-error")) {
        input.classList.remove("form__input-focus");
        input.classList.remove("form__input");
        input.classList.remove("form__input-type");
    } else if (input === document.activeElement) {
        input.classList.add("form__input-focus");
        input.classList.remove("form__input");
        input.classList.remove("form__input-type");
        input.classList.remove("form__input-error");
    } else {
        input.classList.add("form__input");
        input.classList.remove("form__input-focus");
        input.classList.remove("form__input-type");
        input.classList.remove("form__input-error");
    }
}

function validateInput(inputId) {
    const input = document.getElementById(inputId);

    if (input.value.length === 0) {
        input.classList.add("form__input-error");
    } else {
        input.classList.remove("form__input-error");
    }
}

phoneInput.addEventListener('input', function() {
    const phoneNumber = phoneInput.value;
    const phonePattern = /^\d{10}$/; // Проверяем формат: ровно 10 цифр

    if (!phonePattern.test(phoneNumber)) {
        errorLabel.textContent = 'Введите 10 цифр';
        setTimeout(function() {
            errorLabel.textContent = '';
        }, 1500); // Удаление сообщения об ошибке через 2 секунды
    } else {
        errorLabel.textContent = '';
    }
});
openForm.forEach(item => {
    item.addEventListener('click', function () {
        formModal.style.opacity = '1'
        formModal.style.display = 'flex'

    })
})
closeForm.forEach(item => {
    item.addEventListener('click', function () {
        formModal.style.opacity = '0'
        formModal.style.display = 'none'

    })
})
closeSucc.addEventListener('click', function () {
    formModal.style.opacity = '0'
    formModal.style.display = 'none'
})

document.addEventListener('click', (e) => {
    if(e.target === formWrap) {
        formModal.style.opacity = '0'
        formModal.style.display = 'none'
    }
});

// Animation

const animItems = document.querySelectorAll('._anim-items')
if(animItems.length > 0) {

    window.addEventListener('scroll', animOnScroll)

    function animOnScroll() {

        for (var i = 0; i < animItems.length; i++) {
            const animItem = animItems[i]
            const animItemH = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 3

            let animItemPoint = window.innerHeight - animItemH / animStart
            if (animItemH > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemH)) {
                animItem.classList.add('_active')
            } else {
                animItem.classList.remove('_active')
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 300)
}

// Form Validate
const form = document.querySelector('.form__call')

const formBlock = document.querySelector('.form__request')
const formSucc = document.querySelector('.form__answer')
form.addEventListener('submit', function (event) {
    event.preventDefault()
    var error = formValidate(form)
})

function formValidate(form) {
    let error = 0
    const formReq = document.querySelectorAll('._req')
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index]
        formRemoveError(input)
        if (input.classList.contains('_username')) {
            if (usernameTest(input)) {
                formAddError(input)
                error++
            } else {
                if (input.value === '') {
                    formAddError(input)
                    error++
                }
            }
        }
        if (input.classList.contains('_phone')) {
            if (input.value.length < 17) {
                formAddError(input)
                error++
            } else {
                if (input.value === '') {
                    formAddError(input)
                    error++
                }
            }
        }
    }
    if(error == 0) {
        formBlock.style.display = 'none'
        formSucc.style.display = 'block'
    }
}
function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}

// Функция теста username
function usernameTest(input) {
    return !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(input.value)
}

[].forEach.call( document.querySelectorAll('._phone'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___)-___-____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

});


function sendForm() {

	let datastring = $(".form__call").serialize();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: datastring,
		success: function(data) {
			console.log("success");
		},
		error: function() {
			console.log("error");
		}
	});
	return false;
}
// Open form








//


