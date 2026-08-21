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
   CONTACT FORM - BACKEND
========================================= */

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            formStatus.textContent = "Please fill in all fields.";
            formStatus.className = "form-status error";
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status sending";

        try {

            const response = await fetch(
    "https://my-portfolio-amber-eight-28.vercel.app/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {

                formStatus.textContent =
                    "Message sent successfully!";

                formStatus.className =
                    "form-status success";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    data.message || "Failed to send message.";

                formStatus.className =
                    "form-status error";
            }

        } catch (error) {

            console.error("Contact error:", error);

            formStatus.textContent =
                "Cannot connect to the server.";

            formStatus.className =
                "form-status error";

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }

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
/* =========================================
   SKILL BAR SCROLL ANIMATION
========================================= */

const skillBars = document.querySelectorAll(".skill-progress");

const skillsSection = document.querySelector("#skills");

if (skillBars.length > 0 && skillsSection) {

    const skillsObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Reset first
                    skillBars.forEach((bar) => {
                        bar.classList.remove("animate");
                    });

                    // Force browser reflow
                    void skillsSection.offsetWidth;

                    // Animate again
                    skillBars.forEach((bar, index) => {

                        setTimeout(() => {
                            bar.classList.add("animate");
                        }, index * 120);

                    });

                } else {

                    // Reset when leaving Skills section
                    skillBars.forEach((bar) => {
                        bar.classList.remove("animate");
                    });

                }

            });

        },
        {
            threshold: 0.25
        }
    );

    skillsObserver.observe(skillsSection);
}