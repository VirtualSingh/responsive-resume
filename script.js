// //////////////SHOW MENU////////////
function showMenu(toggleId, navId) {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
}
showMenu("nav-toggle", "nav-menu");

// /////////////////REMOVE-MOBILE-MENU////////////
const navLink = document.querySelectorAll(".nav_link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //when we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((link) => {
  link.addEventListener("click", linkAction);
});

// ////////////////////SCROLL-SECTION-ACTIVE-LINK////////////////

////////////////////SCROLL-2-TOP//////////////////
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // when the scroll is higher than 560 viewport height, add the show-scroll class.
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollTop);

// ////////DARK-LIGHT-THEMe////////
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// previously selected topic(if user selected )
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// we obtain the current theme that the nterface has by validating the dark theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bxs-sun";

if (selectedTheme) {
  // if the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

////////////REDUCE THE SIZE  and print on A4 size//////////
function scaleCV() {
  document.body.classList.add("scale-cv");
}
/////////////REMOVE THE SIZE WHEN THE CV IS DOWNLOADED/////////////////////////////////
function removeScale() {
  document.body.classList.remove("scale-cv");
}
//========GENERATE PDF=====================//
// pdf generation
let areaCV = document.getElementById("area-cv");

let resumeButton = document.querySelector("#generate-pdf");

let opt = {
  margin: 0,
  filename: "Resume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
};

// function to call areacv and html2pdf options
function generateResume() {
  html2pdf(areaCV, opt);
}

// when button is clicked, it executes the three functions
resumeButton.addEventListener("click", () => {
  //  1.The class .scale-cv is addded to the body, where it reduces the size of the resume.
  scaleCV();
  // 2. The PDF is generated
  generateResume();
  // 3. the .scale-cv class is removed from the body
  setTimeout(removeScale, 5000);
});
