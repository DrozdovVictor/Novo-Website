// Header
const btn = document.getElementById('header-login-btn')

// Main
const inputs = Array.from(document.querySelectorAll('input'))
const formSubmitBtn = document.getElementById('form-submit-btn')

function changeBtnContent() {
  if (window.innerWidth < 480) btn.textContent = 'NOVO'
  else btn.textContent = 'Перейти на NOVO'
}

window.addEventListener('load', changeBtnContent)
window.addEventListener('resize', changeBtnContent)

function isEmpty() {
  inputs.forEach((el) => {
    if (el.hasAttribute('required') && el.textContent === '') {
      el.style.border = '2px solid red'
    }
  })
}

formSubmitBtn.addEventListener('click', isEmpty)
