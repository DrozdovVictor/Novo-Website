const accordions = document.querySelectorAll('.main__settings-accordion')
const accordionContents = document.querySelectorAll('.main__settings-accordion-content')

function toggleAccordion() {
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', () => accordion.classList.toggle('active'))
  })
}

toggleAccordion()

function dontToggleAccordionContent() {
  accordionContents.forEach((accordionContent) => {
    accordionContent.addEventListener('click', (e) => e.stopPropagation())
  })
}

dontToggleAccordionContent()
