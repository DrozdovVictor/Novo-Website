// Profile
const profileBtn = document.getElementById('profile-btn')
const profileContent = document.getElementById('profile-content')

profileBtn.addEventListener('click', () => profileContent.classList.toggle('active'))

// heart img
const heartImg = document.getElementById('heart-img')

heartImg.addEventListener('click', () => {
  heartImg.classList.toggle('clicked')

  if (heartImg.classList.contains('clicked'))
    heartImg.src = '/assets/Images/customer/item/heart-fill.svg'
  else heartImg.src = '/assets/Images/customer/item/heart-empty.svg'
})

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
