console.log("Portfolio loaded successfully!");


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

}


/* =========================================
   CLOSE MOBILE MENU AFTER NAV CLICK
========================================= */

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        if (menuToggle && navLinks) {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

        }

    });

});


/* =========================================
   ACTIVE NAV LINK WHILE SCROLLING
========================================= */

const sections = document.querySelectorAll("section[id]");


function updateActiveLink() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 180;


    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");


        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-title, " +
    ".about-container, " +
    ".skill-category, " +
    ".project-card, " +
    ".featured-design, " +
    ".design-gallery-title, " +
    ".design-card, " +
    ".design-process, " +
    ".contact-container"
);


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


function revealOnScroll() {

    const windowHeight = window.innerHeight;
    const revealPoint = 100;


    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;


        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill in all fields.");

            return;

        }


        alert(
            "Thanks " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    });

}


/* =========================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    if (
        menuToggle &&
        navLinks &&
        !menuToggle.contains(event.target) &&
        !navLinks.contains(event.target)
    ) {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

    }

});


/* =========================================
   CLOSE MOBILE MENU WITH ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        menuToggle &&
        navLinks
    ) {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");

    }

});