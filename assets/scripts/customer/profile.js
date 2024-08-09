const mainNavItems = document.querySelectorAll('.main__header-nav-item')

mainNavItems.forEach((item) => {
  item.addEventListener('click', () => {
    mainNavItems.forEach((item) => item.classList.remove('active'))
    item.classList.add('active')
  })
})

function changeFullness(className) {
  const contentFullness = Array.from(document.querySelector('.main__content .container').children)

  contentFullness.forEach((fullness) => {
    fullness.classList.add('none')
    if (fullness.classList.contains(className)) {
      fullness.classList.remove('none')
    }
  })
}

changeFullness('main__ads')

function setCurrentContent() {
  const pageLink = document.getElementById('page-link')
  const mainHeading = document.getElementById('main-heading')

  mainNavItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      switch (index) {
        case 0: {
          mainHeading.textContent = 'Избранное'
          if (pageLink === null) return
          pageLink.textContent = 'Избранное'
          changeFullness('main__ads')
          break
        }

        case 1: {
          mainHeading.textContent = 'Сообщения'
          changeFullness('main__messages')
          if (pageLink === null) return
          pageLink.textContent = 'Сообщения'
          break
        }

        case 2: {
          mainHeading.textContent = 'Настройки профиля'
          changeFullness('main__settings')
          if (pageLink === null) return
          pageLink.textContent = 'Настройки профиля'
          break
        }
      }
    })
  })
}

setCurrentContent()

// Search
const searchInput = document.getElementById('main-content-input')
const cardsHeadings = document.querySelectorAll('.main__content-card-heading')
const mainContentRow = document.getElementById('main-content-row')

function createNothingSearchedEl() {
  const newEl = document.createElement('h5')
  newEl.classList.add('main__content-heading')
  newEl.classList.add('nothing-searched-text')
  newEl.textContent = 'Ничего не найдено'

  return newEl
}

searchInput.addEventListener('input', () => {
  const typedText = searchInput.value.toLocaleLowerCase()

  cardsHeadings.forEach((heading) => {
    const searchingHeading = heading.textContent.trim().toLowerCase()

    if (searchingHeading.substring(0, typedText.length) !== typedText) {
      if (heading.closest('.main__content-card') === null) return
      heading.closest('.main__content-card').classList.add('none')
    } else {
      if (heading.closest('.main__content-card') === null) return
      heading.closest('.main__content-card').classList.add('founded')
    }

    if (searchInput.value === '') {
      cardsHeadings.forEach((heading) => {
        if (heading.closest('.main__content-card') === null) return
        heading.closest('.main__content-card').classList.remove('none')
        heading.closest('.main__content-card').classList.remove('founded')
      })
    } else {
      if (
        heading.closest('.main__content-card').classList.contains('founded') &&
        searchingHeading.substring(0, typedText.length) === typedText
      ) {
        heading.closest('.main__content-card').classList.remove('none')
      }
    }
  })
})

// Change textContents for mobile devices

function changemainNavChildText() {
  if (window.innerWidth < 480) {
    mainNavItems[1].querySelector('p').innerHTML =
      '<p class="main__header-nav-item-text">Сообщения <span>(4)</span></p>'
    mainNavItems[2].querySelector('p').innerHTML = ''
  } else if (window.innerWidth < 768) mainNavItems[2].querySelector('p').innerHTML = 'Настройки'
  else {
    mainNavItems[1].querySelector('p').innerHTML =
      '<p class="main__header-nav-item-text">Сообщения <span>(4 новых)</span></p>'
    mainNavItems[2].querySelector('p').innerHTML = 'Настройки профиля'
  }
}

window.addEventListener('resize', changemainNavChildText)
window.addEventListener('load', changemainNavChildText)

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

// Settings
const accordions = document.querySelectorAll('.main__settings-accordion')

accordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    accordion.classList.toggle('active')

    const accordionContent = accordion.querySelector('.main__settings-accordion-content')

    accordionContent.addEventListener('click', (event) => event.stopPropagation())
  })
})

// Settings modals

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
