// Profile
const profileBtn = document.getElementById('profile-btn')
const profileContent = document.getElementById('profile-content')

profileBtn.addEventListener('click', () => profileContent.classList.toggle('active'))

// write to seller btn
const writeToSellerBtn = document.getElementById('write-to-seller-btn')

function changeWriteBtnContent() {
  if (window.innerWidth < 480) {
    writeToSellerBtn.textContent = 'Написать'
  } else writeToSellerBtn.textContent = 'Написать продавцу'
}

window.addEventListener('resize', changeWriteBtnContent)
window.addEventListener('load', changeWriteBtnContent)

// filter
const filter = document.getElementById('filter')
const openFilterBtn = document.getElementById('open-filter-btn')
const filterCategories = document.querySelectorAll('.seller-filter__category')

openFilterBtn.addEventListener('click', () => {
  filter.classList.toggle('active')

  openFilterBtn.querySelector('p').textContent = filter.classList.contains('active')
    ? 'Закрыть фильтp'
    : 'Открыть фильтр'
})
filterCategories.forEach((category) => {
  category.addEventListener('click', () => {
    category.classList.toggle('active')

    const categoryImg = category.querySelector('img')

    if (category.classList.contains('active'))
      categoryImg.src = '../../assets/Images/customer/sellerPage/minus.svg'
    else categoryImg.src = '../../assets/Images/customer/sellerPage/plus.svg'
  })

  const categoryBody = category.querySelector('.seller-filter__category-body')

  categoryBody.addEventListener('click', (event) => event.stopPropagation())
})

// filter accordions

const filterAccordions = document.querySelectorAll('.seller-filter__category-accordion')

filterAccordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    accordion.classList.toggle('active')

    const accordionHeading = accordion.querySelector('.seller-filter__category-accordion-heading')

    const accordionOptions = accordion.querySelectorAll('.seller-filter__category-accordion-option')

    accordionOptions.forEach((accordionOption) => {
      accordionOption.addEventListener(
        'click',
        () => (accordionHeading.textContent = accordionOption.textContent)
      )
    })
  })
})
