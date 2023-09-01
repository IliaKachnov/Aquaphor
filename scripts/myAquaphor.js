const infoAccordionSection = document.querySelector('.info__accordion-section');
const accordionInfo = document.querySelector(".info__accordion");
const accordionArrow = document.querySelector('.info__accordion__arrow');

const openDeleteModal = document.getElementById('info__delete-open');
const closeDeleteModal = document.getElementById('personalData__close');
const modalDelete = document.querySelector('.popup__delete');  
const modalDeleteCancelBtns = document.querySelectorAll('.text-wrapper__btn');

const aboutAccordionSection = document.querySelectorAll('.about__accordion-section');
const accordionAbouts = document.querySelectorAll(".about__accordion");

if(window.innerWidth <= 1024) {
  infoAccordionSection.classList.remove('height')
  infoAccordionSection.classList.remove('height-tall')
}

accordionInfo.addEventListener("click", () => {
  if(window.innerWidth <= 1024) {
    accordionInfo.classList.toggle("active");
    const panel = accordionInfo.nextElementSibling;

    accordionArrow.classList.toggle('active');
    
    if(accordionInfo.classList.contains('border')) {
      accordionInfo.classList.toggle('display')
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
});

accordionAbouts.forEach((accordionAbout) => {
  accordionAbout.addEventListener("click", () => {
      accordionAbout.classList.toggle("active");
      const panel = accordionAbout.nextElementSibling;
      accordionAbout.classList.toggle('border')
  
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
  });
})




openDeleteModal.addEventListener('click', () => {
  modalDelete.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeDeleteModal.addEventListener('click', () => {
  modalDelete.classList.remove('open')
  document.body.style.overflow = 'visible';
});

modalDeleteCancelBtns.forEach((modalDeleteCancelBtn) => {
  modalDeleteCancelBtn.addEventListener('click', () => {
    modalDelete.classList.remove('open')
    document.body.style.overflow = 'visible';
  })
})


const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll(".product__item")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);