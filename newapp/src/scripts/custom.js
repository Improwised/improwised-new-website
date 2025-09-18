import AOS from 'aos'
import 'aos/dist/aos.css'
document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
});

// Mobile nav toggle


const menuButton = document.getElementById('impronav-menu');
menuButton && menuButton.addEventListener('click', toggleMobileNav);
const mobileNav = document.getElementById('mobile-nav')
const closeMenuButton = document.getElementById('impronav-close-menu')
closeMenuButton && closeMenuButton.addEventListener('click', closeNavBar) 
const header = document.querySelector(".impronav-sticky-header");
const mainHeader = document.querySelector("header")
const improLogo = document.getElementById('impro-logo')
const desktopHeader = document.getElementById("desktop-header")

function toggleMobileNav() {
  [...document.querySelectorAll('.impronav-toggle')].forEach((el) => {
    if(mainHeader.classList.contains('scrolled') || mainHeader.classList.contains('impronav-sticky-header')) {
      mainHeader.classList.remove('scrolled')
      mainHeader.classList.remove('impronav-sticky-header')
      mainHeader.classList.remove('impronav-shadow')
    }
    desktopHeader.classList.add('hidden')
    el.classList.remove('-translate-y-[392px]')
    el.classList.add('impronav-shadow')
    menuButton.classList.add('hidden')
    closeMenuButton.classList.remove('hidden')
    closeMenuButton.classList.add('block')
  });
}

function closeNavBar(event) {
  [...document.querySelectorAll('.impronav-toggle')].forEach((el) => {
    el.classList.add('-z-50')
    el.classList.add('-translate-y-[392px]')
    menuButton.classList.remove('hidden')
    closeMenuButton.classList.remove('block')
    closeMenuButton.classList.add('hidden')
    desktopHeader.classList.remove('hidden')
    if(!mainHeader.classList.contains('scrolled') && window.scrollY > 50) {
      mainHeader.classList.add('scrolled')
      mainHeader.classList.add('impronav-sticky-header')
      mainHeader.classList.add('impronav-shadow')
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  function updateHeaderState() {
    if (window.scrollY > 50) {
      if (!desktopHeader.classList.contains('hidden')) {
        mainHeader.classList.add('scrolled')
        mainHeader.classList.add('impronav-shadow')
        mainHeader.classList.add('impronav-sticky-header')
      }
    } else {
      if (!closeMenuButton.classList.contains('block')) {
        mainHeader.classList.remove('scrolled')
        mainHeader.classList.remove('impronav-shadow')
        mainHeader.classList.remove('impronav-sticky-header')
      }
    }
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && desktopHeader.classList.contains('hidden')) {
      desktopHeader.classList.remove('hidden')
    } else if (window.innerWidth < 1024 && !desktopHeader.classList.contains('hidden') && closeMenuButton.classList.contains('block')) {
      desktopHeader.classList.add('hidden')
    }
  })

  window.addEventListener('scroll', updateHeaderState)
  window.addEventListener('load', updateHeaderState)

  // Set initial state on load/refresh
  updateHeaderState()
});
