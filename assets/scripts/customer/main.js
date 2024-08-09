// Profile
const profileBtn = document.getElementById('profile-btn')
const profileContent = document.getElementById('profile-content')

profileBtn.addEventListener('click', () => profileContent.classList.toggle('active'))

// Filter categories
const filterCategories = document.querySelectorAll('.main__content-filter-head-category')

function initFilterCategories() {
  filterCategories.forEach((category) => {
    category.addEventListener('click', () => {
      filterCategories.forEach((category) => category.classList.remove('active'))

      category.classList.toggle('active')
    })
  })
}

initFilterCategories()

// Selects
const selects = document.querySelectorAll('.main__content-filter-content-category-select')

function initSelect() {
  selects.forEach((select) => {
    select.addEventListener('click', () => {
      select.classList.toggle('active')
    })

    const options = select.querySelectorAll(
      '.main__content-filter-content-category-select-body-option'
    )

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const heading = select.querySelector(
          '.main__content-filter-content-category-select-heading'
        )

        heading.textContent = option.textContent
      })
    })
  })
}

initSelect()

function moveFindBtn() {
  const cardSearch = document.getElementById('card-search')
  const searchCardBtn = document.getElementById('search-card-btn')
  const searchCardFilter = document.getElementById('search-card-filter')

  if (window.innerWidth < 1000) {
    cardSearch.prepend(searchCardBtn.parentElement)
    cardSearch.prepend(searchCardFilter)
  } else {
    cardSearch.append(searchCardBtn.parentElement)
    cardSearch.prepend(searchCardFilter)
  }
}

window.addEventListener('resize', moveFindBtn)
window.addEventListener('load', moveFindBtn)

// Scroll

const carsScroll = document.getElementById('recent-ads-scroll')
const scrollLeftBtn = document.getElementById('recent-ads-scroll-left-btn')
const scrollRightBtn = document.getElementById('recent-ads-scroll-right-btn')

scrollLeftBtn.addEventListener('click', () => {
  const carsScrollItem = carsScroll.querySelector('.main__content-ads-item')
  carsScroll.scrollLeft -= carsScrollItem.clientWidth + 20
})

scrollRightBtn.addEventListener('click', () => {
  const carsScrollItem = carsScroll.querySelector('.main__content-ads-item')
  carsScroll.scrollLeft += carsScrollItem.clientWidth + 20
})

function moveScroll() {
  if (window.innerWidth < 1920) {
    const recentAdsInfo = document.querySelector('.main__content-recent-ads-info ')
    recentAdsInfo.prepend(carsScroll)
    recentAdsInfo.prepend(recentAdsInfo.children[1])
  } else {
    const recentAds = document.querySelector('.main__content-recent-ads')
    recentAds.append(carsScroll)
  }
}

window.addEventListener('resize', moveScroll)
window.addEventListener('load', moveScroll)
