'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click',openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const allSelection = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `
we use cookied for improved functionality and analytics. 
<button class="btn btn--close-cookie">Got it!</button>
`

header.prepend(message);

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  message.remove();
})

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height)+30+'px';


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // old Browsers
  window.scrollTo({
    left : s1coords.left+window.pageXOffset, 
    top : s1coords.top+window.pageYOffset,
    behavior : 'smooth'
  });

  // Modern Browsers
  // section1.scrollIntoView({behavior : 'smooth'});

})

window.addEventListener('keypress' , (e) => {
  console.log(e);
})

// Event Propagation

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max-min + 1) + min);
// }

// document.querySelector('.nav__link').addEventListener('click',function (e){
//   console.log('Link');
//   this.style.backgroundColor = `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// });

// document.querySelector('.nav__links').addEventListener('click',(e) => {
//   console.log('UL');
//   e.currentTarget.style.backgroundColor = `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// },true);

// document.querySelector('.nav').addEventListener('click',(e) => {
//   console.log('Nav');
//   e.currentTarget.style.backgroundColor = `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// });

// document.querySelectorAll('.nav__link').forEach((navLink, i) => {
//   navLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     // document.querySelector(`#section--${i+1}`).scrollIntoView({behavior : 'smooth'});
//     // console.log(navLink.getAttribute('href'));
//     document.querySelector(`${navLink.getAttribute('href')}`).scrollIntoView({behavior : 'smooth'});

//   })
// })


// document.querySelector('.nav__link_features').addEventListener('click',() => {
//   window.scrollTo({
//     left : document.querySelector('#section--1').left+window.pageXOffset,
//     top : document.querySelector('#section--1').top+window.pageYOffset,
//     behavior : 'smooth'
//   })
// })

// document.querySelector('.nav__link_operations').addEventListener('click',() => {
//   document.querySelector('#section--2').scrollIntoView({behavior : 'smooth'});

// })

// document.querySelector('.nav__link_testimonials').addEventListener('click',() => {
//   document.querySelector('#section--3').scrollIntoView({behavior : 'smooth'});
// })

document.querySelector('.nav__links').addEventListener('click',(e) => {
  e.preventDefault();
  if(e.target.classList.contains('nav__link'))
  {
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior : 'smooth'});
  }
})

// Operations tab handling

const operationBtnContainer = document.querySelector('.operations__tab-container');
const operationContents = document.querySelectorAll('.operations__content');
const operationBtns = document.querySelectorAll('.operations__tab');


operationBtnContainer.addEventListener('click', (e) => {
  const clickedBtn = e.target.closest('.operations__tab');

  if(!clickedBtn) return;

  operationBtns.forEach((el) => {
    el.classList.remove('operations__tab--active');
  })

  e.target.classList.add('operations__tab--active');

  operationContents.forEach((el) => {
    el.classList.remove('operations__content--active');
  })

  document.querySelector(`.operations__content--${clickedBtn.dataset.tab}`).classList.add('operations__content--active');
})
// const initalCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll' , () => {

//   if(window.scrollY > initalCoords.top){
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

const obsCallback = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry);
  })
}

const obsOptions ={
  root : null,
  threshold : 0.5
}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);