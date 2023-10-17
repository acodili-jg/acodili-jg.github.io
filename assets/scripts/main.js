var themeOptionNodeList = document.getElementsByName("themes");

export function init() {
  var loadedTheme = window.localStorage.getItem("theme");

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
      window.localStorage.setItem("theme", selectedTheme);
    });

    themeOption.checked = themeOption.value == loadedTheme;
  }
}
