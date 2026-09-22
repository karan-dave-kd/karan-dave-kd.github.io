(() => {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const themeToggle = document.getElementById("themeToggle");
  const printResume = document.getElementById("printResume");
  const currentYear = document.getElementById("currentYear");

  currentYear.textContent = new Date().getFullYear();

  navToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const savedTheme = localStorage.getItem("kd-theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀";
  }

  themeToggle?.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    if (dark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("kd-theme", "light");
      themeToggle.textContent = "☾";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("kd-theme", "dark");
      themeToggle.textContent = "☀";
    }
  });

  printResume?.addEventListener("click", () => window.print());

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
})();
