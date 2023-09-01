const openNameModal = document.getElementById('personalData__name');
const closeNameModal = document.getElementById('personalData__close');
const openCodeModal = document.getElementById('personalData__code');
const closeCodeModal = document.getElementById('personalData__code-close');
const openPhoneModal = document.getElementById('personalData__phone');
const closePhoneModal = document.getElementById('personalData__phone-close');
const modalName = document.querySelector('.popup__name');
const modalCode = document.querySelector('.popup__code');
const modalPhone = document.querySelector('.popup__phone');
const userName = document.querySelector('#user__name');
const saveNameBtn = document.querySelector('.text-wrapper__btn');
const inputName = document.querySelector('.text-wrapper__input');



openNameModal.addEventListener('click', () => {
  modalName.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeNameModal.addEventListener('click', () => {
  modalName.classList.remove('open')
  document.body.style.overflow = 'visible';
});

openCodeModal.addEventListener('click', () => {
  modalPhone.classList.remove('open')
  modalCode.classList.add('open');
});
closeCodeModal.addEventListener('click', () => {
  modalCode.classList.remove('open')
  document.body.style.overflow = 'visible';
});

openPhoneModal.addEventListener('click', () => {
  modalPhone.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closePhoneModal.addEventListener('click', () => {
  modalPhone.classList.remove('open')
  document.body.style.overflow = 'visible';
});
// CHANGE NAME

saveNameBtn.addEventListener('click', () => {
  userName.textContent = inputName.value;
  modalName.classList.remove('open')
  document.body.style.overflow = 'visible';
})
// INPUT 
const inputsWrapper = document.querySelector('.popup__code__inputs-wrapper');
const inputs = inputsWrapper.querySelectorAll('input');

inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }
  if (e.key === "Backspace") {
    inputs.forEach((input, index2) => {
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }
});
});