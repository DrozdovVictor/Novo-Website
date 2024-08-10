// Header
const openNavMobileBtn = document.getElementById('open-nav-mobile-btn')
const navMobile = document.getElementById('nav-mobile')
const navMobileList = document.getElementById('nav-mobile-list')
const navMobileListArr = Array.from(navMobileList.children)

function setOpenBurgerСoordinates() {
  Array.from(openNavMobileBtn.children).forEach((el, index) => {
    if (index === 0) el.style.animation = 'openBurderMenuStick1 .5s'
  })
  setTimeout(() => {
    Array.from(openNavMobileBtn.children).forEach((el, index) => {
      index === 0
        ? (el.style.transform = 'translateY(4px) rotate(-45deg)')
        : (el.style.transform = 'translateY(-4px) rotate(45deg)')
    })
  }, 490)
}

function setCloseBurgerCoordinates() {
  Array.from(openNavMobileBtn.children).forEach((el, index) => {
    if (index === 0) el.style.animation = 'closeBurderMenuStick1 .5s'
  })

  setTimeout(() => {
    Array.from(openNavMobileBtn.children).forEach((el) => {
      el.style.transform = 'translateY(0px) rotate(0deg)'
    })
  }, 490)
}

function initBurgerMenu() {
  openNavMobileBtn.classList.toggle('active') === true
    ? setOpenBurgerСoordinates()
    : setCloseBurgerCoordinates()
  clearBurgerAnimations()
}

openNavMobileBtn.addEventListener('click', initBurgerMenu)

function clearBurgerAnimations() {
  setTimeout(() => {
    Array.from(openNavMobileBtn.children).forEach((el) => {
      el.style.animation = 'none'
    })
  }, 550)
}

function showNavMobile() {
  navMobile.style.display = 'flex'
  navMobile.style.animation = 'show .5s'
}

function closeNavMobileMenu() {
  navMobile.style.animation = 'hide .5s'
  setTimeout(() => {
    navMobile.style.display = 'none'
  }, 490)
}

function initNavMobile() {
  openNavMobileBtn.addEventListener('click', function () {
    navMobile.classList.toggle('active') === true ? showNavMobile() : closeNavMobileMenu()
    document.body.classList.toggle('disable')
  })
}

initNavMobile()

function closeNavMobile() {
  navMobileListArr.forEach((el) => {
    el.addEventListener('click', function () {
      document.body.classList.remove('disable')
      navMobile.classList.remove('active')
      navMobile.style.display = 'none'
      openNavMobileBtn.classList.remove('active')
      setCloseBurgerCoordinates()
    })
  })
}

closeNavMobile()

function changeHeroBtnContent() {
  const heroBtn = document.querySelector('.hero__button')
  if (window.innerWidth < 480) {
    heroBtn.textContent = 'Стать продавцом'
  } else heroBtn.textContent = 'Стать продавцом на NOVO'
}

window.addEventListener('load', changeHeroBtnContent)
window.addEventListener('resize', changeHeroBtnContent)

// Pricing
const pricingModalInputs = document.querySelectorAll('.pricing-modal__content-input')
const pricingModalInputSpans = document.querySelectorAll('.pricing-modal__content-input-span')

pricingModalInputs.forEach(function (input, index) {
  input.addEventListener('focus', function () {
    pricingModalInputSpans[index].style.transform = 'scale(1)'
  })

  input.addEventListener('focusout', function () {
    pricingModalInputSpans[index].style.transform = 'scale(0)'
  })
})

// Pricing Modal

const pricingModal = document.getElementById('pricing-modal')
const pricingModalContent = document.getElementById('pricing-modal-content')
const pricingOpenModalPlans = document.querySelectorAll('.pricing__plan')
const pricingFormSubmit = document.getElementById('pricing-form-submit')
const pricingModalCloseBtn = document.getElementById('pricing-modal-close-btn')

function openPricingModal() {
  const scrollWidth = window.innerWidth - document.body.offsetWidth
  pricingModal.classList.add('active')
  document.body.classList.add('disable')
  document.body.style.paddingRight = `${scrollWidth}px`
}

function closePricingModal() {
  pricingModal.classList.remove('active')
  document.body.classList.remove('disable')
  document.body.style.paddingRight = `0px`
}

pricingOpenModalPlans.forEach(function (plan) {
  plan.addEventListener('click', function () {
    openPricingModal()
    pricingModalContent.style.animation = 'flip-in-hor-bottom .4s'

    pricingModalInputs.forEach(function (input) {
      input.classList.remove('invalid')
    })
  })
})

pricingModal.addEventListener('click', function (event) {
  if (event.target !== pricingModalContent) {
    pricingModalContent.style.animation = 'scale-out-center .4s'
    setTimeout(closePricingModal, 380)
  }
})

pricingModalContent.addEventListener('click', function (event) {
  event.stopPropagation()
})

pricingFormSubmit.addEventListener('click', function () {
  pricingModalInputs.forEach(function (input) {
    if (input.value === '') {
      input.classList.add('invalid')
    } else {
      closePricingModal()
    }
  })
})

pricingModalCloseBtn.addEventListener('click', function () {
  pricingModalContent.style.animation = 'scale-out-center .4s'
  setTimeout(closePricingModal, 380)
})
