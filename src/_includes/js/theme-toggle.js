(function () {
  const storageKey = "theme-preference";

  const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey);
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  };

  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  };

  const reflectPreference = () => {
    document.documentElement.dataset.theme = theme.value;
    document
      .querySelector("#theme-toggle")
      ?.setAttribute(
        "aria-label",
        `Switch to ${theme.value === "light" ? "dark" : "light"} theme`,
      );
  };

  const theme = {
    value: getColorPreference(),
  };

  reflectPreference();

  window.onload = () => {
    reflectPreference();

    document.querySelector("#theme-toggle").addEventListener("click", () => {
      theme.value = theme.value === "light" ? "dark" : "light";
      setPreference();
    });
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      theme.value = isDark ? "dark" : "light";
      setPreference();
    });
})();
