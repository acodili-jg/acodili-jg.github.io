var themeOptionNodeList = document.getElementsByName("themes");

export function init() {
  var loadedTheme = localStorage.getItem("acodili-jg.github.io/theme");

  switch (loadedTheme) {
    case "dark":
    case "light":
      break;
    default:
      loadedTheme = getComputedStyle(document.documentElement).getPropertyValue("--default-theme");
      break;
  }

  document.documentElement.setAttribute("data-theme", loadedTheme);

  for (const themeOption of themeOptionNodeList) {
    themeOption.addEventListener("change", () => {
      var selectedTheme = themeOption.value;
      document.documentElement.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("acodili-jg.github.io/theme", selectedTheme);
    });

    themeOption.checked = themeOption.value == loadedTheme;
  }
}
