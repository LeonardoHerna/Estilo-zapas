// theme-toggle.js

(function () {
  const storageKey = "theme-preference";

  // Decide tema inicial: localStorage > preferencia del sistema > light
  function getInitialTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(storageKey, theme);
    updateToggleButton(theme);
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  }

  function updateToggleButton(currentTheme) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    if (currentTheme === "dark") {
      btn.setAttribute("aria-label", "Cambiar a tema claro");
  
    } else {
      btn.setAttribute("aria-label", "Cambiar a tema oscuro");
    }
  }

  // Init on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const initial = getInitialTheme();
    applyTheme(initial);

    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTheme();
      });
    }

    // Escuchar cambios de preferencia del sistema y respetar solo si no hay override
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const stored = localStorage.getItem(storageKey);
        if (stored !== "dark" && stored !== "light") {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  });
})();
