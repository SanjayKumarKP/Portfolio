"use strict";
let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back </>";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});
/**
 * PRELOADER
 */
const preloader = document.querySelector("[data-preloader]");
window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
/**
 * add event on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};
/**
 * Mobile navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");
addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});
addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});
/**
 * Header active
 */
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});
/**
 * Element tilt effect
 */
const tiltElements = document.querySelectorAll("[data-tilt]");
const initTilt = function (event) {
  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;
  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;
  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${
    tiltPosY - tiltPosY * 2
  }deg)`;
};
addEventOnElements(tiltElements, "mousemove", initTilt);
addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});
/**
 * Tab content
 */
const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");
let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];
const filterContent = function () {
  if (!(lastActiveTabBtn === this)) {
    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");
    this.classList.add("active");
    lastActiveTabBtn = this;
    const currentTabContent = document.querySelector(
      `[data-tab-content="${this.dataset.tabBtn}"]`
    );
    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;
  }
};
addEventOnElements(tabBtns, "click", filterContent);
/**
 * Custom cursor
 */
const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [
  ...document.querySelectorAll("button"),
  ...document.querySelectorAll("a"),
];
window.addEventListener("mousemove", function (event) {
  const posX = event.clientX;
  const posY = event.clientY;
  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;
  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);
});
/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});
/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});
// Contact form variables
const form = document.querySelector(".contact-form");
const formInputs = document.querySelectorAll(".input-field");
const formBtn = document.querySelector(".form-btn");
// Add event to all form input fields
formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});
// Submit form event
formBtn.addEventListener("click", function (event) {
  if (form.checkValidity()) {
    event.preventDefault();
    // Gather form data
    const fullname = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email_address"]').value;
    const phonenumber = document.querySelector('input[name="phone"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const formData =
      "Query: Sanjay.\nName => " +
      fullname +
      "\nPhone => " +
      phonenumber +
      "\nEmail => " +
      email +
      "\nMessage => " +
      message;
    // Send form data to Telegram Bot API
    fetch(
      "https://api.telegram.org/bot5461138168:AAGTdgtCdPJPT4mlD17pQjt3d34rtZNKviQ/sendMessage",
      // Replace with your Telegram Bot API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "-1001698122734", // Replace with your Telegram chat ID
          text: formData,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
