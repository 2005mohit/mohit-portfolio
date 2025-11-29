// ==========================
// Main JS – clean & focused
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  // ====== Mobile nav toggle ======
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav__links--open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav__links--open");
      });
    });
  }

  // ====== Smooth scroll for internal links ======
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ====== Scroll progress bar ======
  const scrollBar = document.querySelector(".scroll-progress");
  const updateScrollProgress = () => {
    if (!scrollBar) return;
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = `${progress}%`;
  };
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress);

  // ====== IntersectionObserver reveal ======
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach((el, index) => {
      el.style.transitionDelay = `${index * 60}ms`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("reveal--visible"));
  }

 
  const roleSpan = document.getElementById("hero-role-text");

  if (roleSpan) {
    const roles = [
      "a AI Developer",
      "a ML Developer",
      "a MCA Student",
      "a Cybersecurity Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 90;      // typing speed
    const deleteSpeed = 60;    // deleting speed
    const holdTime = 1200;     // full word kitni der rukega

    const typeLoop = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        // typing
        roleSpan.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          deleting = true;
          roleSpan.classList.add("typing-done");
          setTimeout(() => {
            roleSpan.classList.remove("typing-done");
            typeLoop();
          }, holdTime);
          return;
        }
      } else {
        // deleting
        roleSpan.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const delay = deleting ? deleteSpeed : typeSpeed;
      setTimeout(typeLoop, delay);
    };

    setTimeout(typeLoop, 500);
  }
});
