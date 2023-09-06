const infoAccordionSection = document.querySelector('.info__accordion-section');
const accordionInfo = document.querySelector(".info__accordion");
const accordionArrow = document.querySelector('.info__accordion__arrow');

const openDeleteModal = document.getElementById('info__delete-open');
const closeDeleteModal = document.getElementById('personalData__close');
const modalDelete = document.querySelector('.popup__delete');  
const modalDeleteCancelBtns = document.querySelectorAll('.text-wrapper__btn');

const aboutAccordionSection = document.querySelectorAll('.about__accordion-section');
const accordionAbouts = document.querySelectorAll(".about__accordion");
const productItems = document.querySelectorAll('.product__item');

productItems.forEach(item => {
  item.addEventListener('click', () => {
    if (!item.classList.contains('active')) {
      item.classList.add('active');
      productItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    }
  });
});

if(window.innerWidth <= 1024) {
  infoAccordionSection.classList.remove('height')
  infoAccordionSection.classList.remove('height-tall')
};

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
arrowIcons = document.querySelectorAll(".wrapper__carousel i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; 
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 400);
    });
});

const autoSlide = () => {
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
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