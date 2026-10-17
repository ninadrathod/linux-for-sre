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
  const dockLinks = document.querySelectorAll(".dock-link");

  function setActive(id) {
    allNavLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("bg-indigo-50", isActive);
      link.classList.toggle("text-indigo-700", isActive);
      link.classList.toggle("font-semibold", isActive);
      link.classList.toggle("text-slate-600", !isActive);
    });
    dockLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
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
      { rootMargin: "-32px 0px -70% 0px" } // active zone starts just under the top bar
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ----------------------------------------------------------
     Copy-to-Clipboard Buttons for Code Blocks
  ---------------------------------------------------------- */
  document.querySelectorAll("pre").forEach((pre) => {
    // Wrap each code block in a GNOME Terminal-style window
    const wrapper = document.createElement("div");
    wrapper.className = "term-window";
    pre.parentNode.insertBefore(wrapper, pre);

    const titlebar = document.createElement("div");
    titlebar.className =
      "term-titlebar h-9 flex items-center gap-2 px-3 text-xs font-semibold select-none";
    titlebar.innerHTML =
      '<span class="w-16"></span>' +
      '<span class="flex-1 text-center truncate">sre@ubuntu: ~</span>';
    wrapper.appendChild(titlebar);
    wrapper.appendChild(pre);

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.className =
      "copy-btn w-16 bg-white/10 hover:bg-white/20 text-[#E6D5E1] text-xs py-1 " +
      "rounded-md transition-colors duration-150 font-sans font-medium";
    titlebar.appendChild(btn);

    btn.addEventListener("click", () => {
      const code = pre.querySelector("code")
        ? pre.querySelector("code").innerText
        : pre.innerText;
      navigator.clipboard
        .writeText(code.trim())
        .then(() => {
          btn.textContent = "Copied!";
          btn.classList.add("!bg-ubuntu-orange", "!text-white");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("!bg-ubuntu-orange", "!text-white");
          }, 2000);
        })
        .catch(() => {
          btn.textContent = "Error";
          setTimeout(() => (btn.textContent = "Copy"), 2000);
        });
    });
  });

  /* ----------------------------------------------------------
     Diagram Swipe Hint (narrow screens scroll diagrams sideways)
  ---------------------------------------------------------- */
  document.querySelectorAll(".diagram").forEach((diagram) => {
    const hint = document.createElement("p");
    hint.className = "diagram-hint sticky left-0 mt-2 text-center text-[11px] text-slate-400";
    hint.textContent = "← swipe to see the full diagram →";
    diagram.appendChild(hint);
  });

  /* ----------------------------------------------------------
     Smooth Scroll for Anchor Links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        // GNOME top bar (32px) + header bar when shown (phones/tablets) + breathing room
        const header = document.querySelector("header");
        const offset = 32 + (header && header.offsetHeight ? header.offsetHeight : 0) + 16;
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

  /* ----------------------------------------------------------
     GNOME Top Bar Clock
  ---------------------------------------------------------- */
  const clockEl = document.getElementById("topbar-clock");
  function updateClock() {
    const now = new Date();
    const day = now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    const time = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    // Date only on wider screens so the clock never collides with the tray icons
    clockEl.innerHTML = '<span class="hidden sm:inline">' + day + "&nbsp;&nbsp;</span>" + time;
  }
  if (clockEl) {
    updateClock();
    setInterval(updateClock, 15000);
  }
})();
