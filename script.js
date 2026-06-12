/* ============================================================
   Linux for SRE – Interactive Tutorial Script
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Reading Progress Bar
  ---------------------------------------------------------- */
  const progressBar = document.getElementById("progress-bar");
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ----------------------------------------------------------
     Mobile Menu
  ---------------------------------------------------------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("menu-close");
  const menuOverlay = document.getElementById("menu-overlay");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    document.body.style.overflow = "";
  }

  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  document.querySelectorAll("#mobile-nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ----------------------------------------------------------
     Active Section Highlighting (Intersection Observer)
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const allNavLinks = document.querySelectorAll(".nav-link");

  function setActive(id) {
    allNavLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("bg-indigo-50", isActive);
      link.classList.toggle("text-indigo-700", isActive);
      link.classList.toggle("font-semibold", isActive);
      link.classList.toggle("text-slate-600", !isActive);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            // sync mobile nav too
            const mobileLink = document.querySelector(
              `#mobile-nav a[href="#${entry.target.id}"]`
            );
            if (mobileLink) {
              mobileLink.scrollIntoView({ block: "nearest", inline: "nearest" });
            }
          }
        });
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ----------------------------------------------------------
     Copy-to-Clipboard Buttons for Code Blocks
  ---------------------------------------------------------- */
  document.querySelectorAll("pre").forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "relative group";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.className =
      "copy-btn absolute top-3 right-3 opacity-0 group-hover:opacity-100 " +
      "bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs px-2.5 py-1 " +
      "rounded transition-all duration-150 font-mono";
    wrapper.appendChild(btn);

    btn.addEventListener("click", () => {
      const code = pre.querySelector("code")
        ? pre.querySelector("code").innerText
        : pre.innerText;
      navigator.clipboard
        .writeText(code.trim())
        .then(() => {
          btn.textContent = "Copied!";
          btn.classList.add("bg-emerald-700", "text-emerald-100");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("bg-emerald-700", "text-emerald-100");
          }, 2000);
        })
        .catch(() => {
          btn.textContent = "Error";
          setTimeout(() => (btn.textContent = "Copy"), 2000);
        });
    });
  });

  /* ----------------------------------------------------------
     Smooth Scroll for Anchor Links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80; // account for sticky header on mobile
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ----------------------------------------------------------
     Quiz Answer Toggle Keyboard Accessibility
  ---------------------------------------------------------- */
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) {
        const answer = details.querySelector(".answer-reveal");
        if (answer) answer.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  });

  /* ----------------------------------------------------------
     Back-to-Top Button
  ---------------------------------------------------------- */
  const backTop = document.getElementById("back-to-top");
  if (backTop) {
    window.addEventListener(
      "scroll",
      () => {
        backTop.classList.toggle("opacity-0", window.scrollY < 400);
        backTop.classList.toggle("pointer-events-none", window.scrollY < 400);
      },
      { passive: true }
    );
    backTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ----------------------------------------------------------
     Current Year in Footer
  ---------------------------------------------------------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
