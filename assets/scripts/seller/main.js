// Setting part

// import './settings'

// Main header

const navItems = Array.from(document.querySelectorAll('.main__header-nav-item'))
const addingBtn = document.querySelector('.main__content-input-button')
const headerLoginBtn = document.querySelector('.header__login')
const navItemsTexts = Array.from(document.querySelectorAll('.main__header-nav-item-text'))

function setActiveNavItem() {
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navItems.forEach((item) => item.classList.remove('active'))
      item.classList.add('active')
    })
  })
}

setActiveNavItem()

function changeAddingBtn() {
  if (window.innerWidth < 1920) addingBtn.classList.add('static')
  else addingBtn.classList.remove('static')
}

window.addEventListener('load', changeAddingBtn)
window.addEventListener('resize', changeAddingBtn)

function changeHeaderContent() {
  if (window.innerWidth < 480) {
    headerLoginBtn.textContent = 'NOVO'
    navItemsTexts[0].textContent = 'Объявления'
    navItemsTexts[2].textContent = 'Подписка'
  } else {
    headerLoginBtn.textContent = 'Перейти на NOVO'
    navItemsTexts[0].textContent = 'Мои объявления'
    navItemsTexts[2].textContent = 'Управление подпиской'
  }
}

window.addEventListener('load', changeHeaderContent)
window.addEventListener('resize', changeHeaderContent)

// Main Content
// Main ads
const cards = Array.from(document.querySelectorAll('.main__content-card'))
const cardsDeleteBtns = Array.from(document.querySelectorAll('.main__content-delete-card-btn'))
const mainHeading = document.getElementById('main-heading')
const mainContentHeading = document.getElementById('main-content-heading')
const mainContentHeading2 = document.getElementById('main-content-heading-2')
const mainContentInput = document.getElementById('main-content-input')
const contentFullness = Array.from(document.querySelector('.main__content .container').children)
const mainContentRow = Array.from(document.getElementById('main-content-row').children)
const mainContentRowDOM = document.getElementById('main-content-row')

let quantity = +mainContentRowDOM.children.length
function setCardQuantity() {
  const cardsQuantity = mainContentHeading.querySelector('span')
  const cardsQuantity2 = mainContentHeading2.querySelector('span')
  cardsQuantity.textContent = `${quantity}/10`
  cardsQuantity2.textContent = `${quantity}/10`
}

setCardQuantity()

function changeCardQuantity(sign) {
  function changeQuantity() {
    if (sign === '+') {
      ++quantity
      setCardQuantity()
    }

    if (sign === '-') {
      --quantity
      setCardQuantity()
    }
  }

  return changeQuantity()
}

function createNothingSearchedEl() {
  const newEl = document.createElement('h5')
  newEl.classList.add('main__content-heading')
  newEl.classList.add('nothing-searched-text')
  newEl.textContent = 'Ничего не найдено'

  return newEl
}

function createNothingHavingEl() {
  const newEl = document.createElement('h5')
  newEl.classList.add('main__content-heading')
  newEl.classList.add('nothing-text')
  newEl.textContent = 'Ничего нет'

  return newEl
}

function searchCard() {
  const mainCardsHeadings = Array.from(document.querySelectorAll('.main__content-card-heading'))
  mainCardsHeadings.forEach((heading) => {
    heading.textContent = heading.textContent.trim()
    const currentLetterQuantity = mainContentInput.value.length
    const searchingText = heading.textContent.slice(0, currentLetterQuantity)
    const headingCard = heading.closest('.main__content-card')
    const nothingSearchedTextEl = mainContentRowDOM.querySelector('.nothing-searched-text')

    function search() {
      if (
        searchingText.toLowerCase() !== mainContentInput.value.toLowerCase() &&
        heading.classList.contains('ads') &&
        mainContentInput.value.length > 0
      ) {
        headingCard.classList.add('none')
        headingCard.classList.remove('founded')
      } else {
        if (headingCard === null) return
        headingCard.classList.add('founded')
      }

      if (searchingText.toLowerCase() === mainContentInput.value.toLowerCase()) {
        if (headingCard === null) return
        headingCard.classList.remove('none')
      }

      if (mainContentInput.value.length === 0) {
        cards.forEach((card) => {
          card.classList.remove('none')
        })

        headingCard.classList.remove('founded')
      }

      if (nothingSearchedTextEl || mainContentInput.value.length === 0) {
        if (nothingSearchedTextEl === null) return
        nothingSearchedTextEl.remove()
      }
    }

    search()
  })

  function nothingSearched() {
    const cardsNoneArr = mainContentRow.filter((item) => !item.classList.contains('none'))
    const foundedCards = Array.from(mainContentRowDOM.querySelectorAll('.founded'))

    const newEl = createNothingSearchedEl()
    const nothingSearchedTextEl = mainContentRowDOM.querySelector('.nothing-searched-text')

    if (
      ((cardsNoneArr.length === 0 && !nothingSearchedTextEl) ||
        (foundedCards.length === 0 && !nothingSearchedTextEl && mainContentInput.value !== '')) &&
      !mainContentRowDOM.querySelector('.nothing-text')
    ) {
      mainContentRowDOM.prepend(newEl)
    }

    if (mainContentInput.value === '' || cardsNoneArr.length === 0) {
      if (nothingSearchedTextEl === null) return
      nothingSearchedTextEl.remove()
    }

    if (mainContentRowDOM.children.length === 0) {
      mainContentRowDOM.append(createNothingHavingEl())
    }
  }

  nothingSearched()
}

mainContentInput.addEventListener('input', searchCard)

function setHoveredCard() {
  mainContentRowDOM.childNodes.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth < 1000) {
        return
      }

      card.classList.add('hovered')
    })

    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered')
    })
  })
}

setHoveredCard()

function changeCardGeo() {
  const cardGeoInfo = Array.from(document.querySelectorAll('.main__content-card-geo-text'))
  if (window.innerWidth < 768) cardGeoInfo.forEach((item) => (item.textContent = 'Netherlands'))
  else cardGeoInfo.forEach((item) => (item.textContent = 'Garage van Nierop Netherlands'))
}

window.addEventListener('load', changeCardGeo)
window.addEventListener('resize', changeCardGeo)

cardsDeleteBtns.forEach((btn) => removeCard(btn))

function removeCard(btn) {
  btn.addEventListener('click', () => {
    const card = btn.closest('.main__content-card')
    card.remove()
    const foundedCards = Array.from(mainContentRowDOM.querySelectorAll('.founded'))
    if (foundedCards.length === 0) mainContentRowDOM.prepend(createNothingSearchedEl())
    changeCardQuantity('-')

    const nothingSearchedTextEl = mainContentRowDOM.querySelector('h5')
    if (mainContentInput.value.length === 0) nothingSearchedTextEl.remove()
    if (nothingSearchedTextEl === null) return

    if (mainContentRowDOM.children.length === 0) {
      mainContentRowDOM.prepend(createNothingHavingEl())
    }
  })
}

function changeContentFullness() {
  changeFullness('main__ads')
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      switch (index) {
        case 0: {
          if (addCardBtn.classList.contains('active')) {
            mainHeading.textContent = 'Создание объявления'
            changeFullness('main__addItem')
          } else {
            mainHeading.textContent = 'Мои объявления'
            changeFullness('main__ads')
          }
          break
        }

        case 1: {
          mainHeading.textContent = 'Сообщения'
          changeFullness('main__messages')
          break
        }

        case 2: {
          mainHeading.textContent = 'Управление подпиской'
          changeFullness('main__subscription')
          break
        }

        case 3: {
          mainHeading.textContent = 'Сообщения'
          changeFullness('main__messages')
          break
        }

        case 4: {
          mainHeading.textContent = 'Настройки профиля'
          changeFullness('main__settings')
          break
        }
      }
    })
  })
}

function changeFullness(className) {
  contentFullness.forEach((fullness) => {
    fullness.classList.add('none')
    if (fullness.classList.contains(className)) {
      fullness.classList.remove('none')
    }
  })
}

changeContentFullness()

// Main modals
// Email
const mainSettingsEmailModal = document.getElementById('main-settings-email-modal')
const mainSettingsEmailModalContent = document.getElementById('main-settings-email-modal-content')
const mainSettingsEmailModalOpenBtn = document.getElementById('main-setting-email-modal-btn-open')
const mainSettingsEmailModalCloseBtn = document.getElementById('main-setting-email-modal-btn-close')
const mainSettingsEmailModalInput = document.getElementById('main-setting-email-modal-input')
// Password
const mainSettingsPasswordModal = document.getElementById('main-settings-password-modal')
const mainSettingsPasswordModalContent = document.getElementById(
  'main-settings-password-modal-content'
)
const mainSettingsPasswordModalOpenBtn = document.getElementById(
  'main-setting-password-modal-btn-open'
)
const mainSettingsPasswordModalCloseBtn = document.getElementById(
  'main-setting-password-modal-btn-close'
)
const mainSettingsPasswordModalInput = document.getElementById('main-setting-password-modal-input')

function initModal(modal, modalContent, openBtn, closeBtn, input) {
  function closeModal() {
    document.body.classList.remove('disable')
    document.body.style.paddingRight = '0px'
    modal.classList.remove('active')
  }
  modal.addEventListener('click', closeModal)
  modalContent.addEventListener('click', (event) => event.stopPropagation())

  openBtn.addEventListener('click', () => {
    const scrollPadding = window.innerWidth - document.body.offsetWidth
    document.body.classList.add('disable')
    document.body.style.paddingRight = `${scrollPadding}px`
    modal.classList.add('active')
  })

  closeBtn.addEventListener('click', closeModal)

  input.addEventListener('invalid', () => {
    modal.classList.remove('active')
    document.body.style.paddingRight = '0px'
    document.body.classList.remove('disable')
  })
}

initModal(
  mainSettingsEmailModal,
  mainSettingsEmailModalContent,
  mainSettingsEmailModalOpenBtn,
  mainSettingsEmailModalCloseBtn,
  mainSettingsEmailModalInput
)

initModal(
  mainSettingsPasswordModal,
  mainSettingsPasswordModalContent,
  mainSettingsPasswordModalOpenBtn,
  mainSettingsPasswordModalCloseBtn,
  mainSettingsPasswordModalInput
)

// Main add item
const addCardBtn = document.getElementById('add-card-btn')
const addCardBtn2 = document.getElementById('add-card-btn-2')
const addItemBtnClose = document.getElementById('main-addItem-close-btn')
const createCardBtn = document.getElementById('create-card-btn')

function addCard() {
  addCardBtn.classList.add('active')
  mainHeading.textContent = 'Создание объявления'
  changeFullness('main__addItem')
}

addCardBtn.addEventListener('click', addCard)

addCardBtn2.addEventListener('click', addCard)

addItemBtnClose.addEventListener('click', () => {
  addCardBtn.classList.remove('active')
  mainHeading.textContent = 'Мои объявления'
  changeFullness('main__ads')
})

createCardBtn.addEventListener('click', () => {
  if (quantity > 9) {
    return
  } else {
    const newCard = document.createElement('div')
    newCard.classList.add('main__content-card')
    newCard.insertAdjacentHTML(
      'afterbegin',
      `<img
                  class="main__content-card-img"
                  src="/assets/Images/seller/main/car-4.png"
                  alt="car-1"
                />
                <p class="main__content-card-category-text">
                  Закрытые грузопассажирские автомобили
                </p>
                <h6 class="main__content-card-heading ads">
                  Mercedes-Benz V 250 d lang Avantgarde Edition 360° Stdhzg....
                </h6>
                <div class="main__content-card-row">
                  <div class="main__content-card-row-item">2015</div>
                  <div class="main__content-card-row-item">2 000 kg</div>
                  <div class="main__content-card-row-item">490 574 km</div>
                </div>
                <hr class="main__content-card-line" />
                <div class="main__content-card-geoPrice">
                  <div class="main__content-card-geo">
                    <img src="/assets/Images/seller/main/location.svg" alt="location" />
                    <p class="main__content-card-geo-text">Garage van Nierop Netherlands</p>
                  </div>
                  <h3 class="main__content-card-price">54 300€</h3>
                </div>
                <div class="main__content-card-edit">
                  <a href="item.html" class="main__content-edit-card-btn" type="button">
                    Редактировать
                  </a>
                  <button class="main__content-delete-card-btn" type="button">
                    <img src="/assets/Images/seller/main/trash.svg" alt="trash" />
                    Удалить
                  </button>
        </div>`
    )

    const nothingHavingText = mainContentRowDOM.querySelector('.nothing-text')
    if (nothingHavingText) nothingHavingText.remove()

    mainContentRowDOM.append(newCard)
    changeCardQuantity('+')
    setHoveredCard()

    const cardsDeleteBtns = Array.from(document.querySelectorAll('.main__content-delete-card-btn'))
    cardsDeleteBtns.forEach((btn) => removeCard(btn))

    changeFullness('main__ads')
    changeCardGeo()
  }
})

// Main messages

// Messages

const messagesBlocks = document.querySelectorAll('.main__messages-body-block')
const removeConversationBtn = document.getElementById('remove-conversation-btn')
const conversationPageNumber = document.getElementById('conversation-page-number')

function initConversationRemoving() {
  messagesBlocks.forEach((block) => {
    block.addEventListener('click', () => {
      block.classList.toggle('active')

      const messagesBlocksArr = Array.from(messagesBlocks)
      const activeBlocks = messagesBlocksArr.filter((block) => block.classList.contains('active'))

      if (block.classList.contains('active')) removeConversationBtn.classList.add('active')
      else if (activeBlocks.length > 0) removeConversationBtn.classList.add('active')
      else removeConversationBtn.classList.remove('active')
    })
  })

  removeConversationBtn.addEventListener('click', () => {
    messagesBlocks.forEach((block) => {
      if (block.classList.contains('active')) {
        block.closest('.main__messages-body-conversation').remove()
        removeConversationBtn.classList.remove('active')
      }
    })
  })
}

initConversationRemoving()

function initConversationNav() {
  const conversationsScroll = document.getElementById('conversations-scroll')
  const prevConversationBtn = document.getElementById('prev-conversation-page-btn')
  const nextConversationBtn = document.getElementById('next-conversation-page-btn')
  let pageNumber = 1

  prevConversationBtn.addEventListener('click', () => {
    conversationsScroll.scrollLeft -= conversationsScroll.children[0].clientWidth
    if (pageNumber < 2) return
    if (window.innerWidth < 480) conversationPageNumber.textContent = `${--pageNumber}`
    else conversationPageNumber.textContent = `Страница ${--pageNumber}`
  })

  nextConversationBtn.addEventListener('click', () => {
    conversationsScroll.scrollLeft += conversationsScroll.children[0].clientWidth
    if (pageNumber >= conversationsScroll.children.length) return
    if (window.innerWidth < 480) conversationPageNumber.textContent = `${++pageNumber}`
    else conversationPageNumber.textContent = `Страница ${++pageNumber}`
  })
}

initConversationNav()

function changeNavPageContent() {
  if (window.innerWidth < 480) {
    conversationPageNumber.textContent = '1'
  } else conversationPageNumber.textContent = 'Страница 1'
}

window.addEventListener('resize', changeNavPageContent)
window.addEventListener('load', changeNavPageContent)
