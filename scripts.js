
document.addEventListener("DOMContentLoaded", () => {

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
      "a Python Developer",
      "a cybersecurity enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeSpeed = 90;     
    const deleteSpeed = 60;   
    const holdTime = 1200;     

    const typeLoop = () => {
      const current = roles[roleIndex];

      if (!deleting) {

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
