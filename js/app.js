/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const nav = document.getElementById("navbar__list");
const navItems = document.querySelectorAll("a.menu__link");
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function isInViewport(element) {
  const box = element.getBoundingClientRect();
  return (
    box.top >= 0 &&
    box.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    // reference: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  );
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNavMenu = () => {
    let navMenuHTML = " ";
    sections.forEach((section, index) => { 
      const sectionId = section.getAttribute("id");
      const sectionName = section.getAttribute("data-nav");
      const isActive = index === 0 ? "active" : ""; 
  
      navMenuHTML += `<li><a class="menu__link ${isActive}" href="#${sectionId}">${sectionName}</a></li>`;
    });
    nav.innerHTML = navMenuHTML;
  };
  

// Add class 'active' to section when near top of viewport
const makeSectionActive = () => {
  for (const section of sections) {
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  }
};

const makeNavActive = () => {
    for (const section of sections) {
      const navItem = document.querySelector(`[href="#${section.id}"]`);
  
      if (navItem) {
        const isActive = isInViewport(section);
  
        if (isActive) {
          navItem.classList.add("active");
        } else {
          navItem.classList.remove("active");
        }
      }
    }
  }  

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
  event.preventDefault();
  const sectionIdToScroll = event.target.getAttribute("href");
  const sectionToScroll = document.querySelector(sectionIdToScroll);
  sectionToScroll.scrollIntoView({ behavior: "smooth" });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", () => {
    buildNavMenu(), makeNavActive()});
// Scroll to section on link click
document.addEventListener("scroll", () => {
  makeSectionActive(), makeNavActive();
});
// Set sections as active
nav.addEventListener("click", scrollToSection);
makeNavActive();
