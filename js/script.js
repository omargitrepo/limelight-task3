document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");
  const backTop = document.getElementById("backTop");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];

  document.getElementById("year").textContent = new Date().getFullYear();

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 30);
    backTop.classList.toggle("show", y > 500);

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    progress.style.width = scrollable > 0 ? `${(y / scrollable) * 100}%` : "0%";

    let current = "home";
    sections.forEach(section => {
      if (y >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn-nav").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
