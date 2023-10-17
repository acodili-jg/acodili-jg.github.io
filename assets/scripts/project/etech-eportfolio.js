import { init } from "../main.js";

init();

function DateTimeFormatter(options) {
  return Intl.DateTimeFormat(undefined, options).format;
}
const formatYear  = DateTimeFormatter({year: "numeric"});
const formatMonth = DateTimeFormatter({year: "numeric", month: "long"});
const formatDay   = DateTimeFormatter({year: "numeric", month: "long", day: "numeric"});
const MatchType = Object.freeze({
  CRLF: 1,
  DATE: 2,
  MONTH: 3,
  DAY: 4,
  ABBR: 5,
  TEXT: 6,
});

var data = document.getElementById("data");
data.addEventListener("input", (event) => {
  var actualData = JSON.parse(data.value);

  for (const [id, text] of Object.entries(actualData)) {
    var element = document.getElementById(id);
    element.textContent = "";

    var pattern = /(?<crlf>\n\r?|\r)|(?<date>\d{4}(?<month>-\d{2}(?<day>-\d{2})?)?)|(?<abbr>\([^(|)]+\|[^(|)]+\))|(?<text>.+?(?=(?:\n\r?|\r)|(?:\d{4}(?:-\d{2}){0,2})|(?:\([^(|)]+\|[^(|)]+\))|$))/gy;
    for (var match; (match = pattern.exec(text)) !== null; ) {

      var value = match[0];
      var type = MatchType.TEXT;
      for (var i = 5; i > 0; i--)
        if (match[i] !== undefined) {
          type = i;
          break;
        }

      switch (type) {
        case MatchType.CRLF:
          element.innerHTML += `<br>`;
          break;
        case MatchType.DATE:
          element.innerHTML += `<time datetime="${value}">${formatYear(Date.parse(value))}</time>`;
          break;
        case MatchType.MONTH:
          element.innerHTML += `<time datetime="${value}">${formatMonth(Date.parse(value))}</time>`;
          break;
        case MatchType.DAY:
          element.innerHTML += `<time datetime="${value}">${formatDay(Date.parse(value))}</time>`;
          break;
        case MatchType.ABBR:
          value = value.slice(1, -1);
          var [title, abbr] = value.split("|");
          var abbrElement = document.createElement("abbr");
          // Minimize interpolation
          if (title) {
            abbrElement.setAttribute("title", title);
            abbrElement.textContent = abbr;
            element.appendChild(abbrElement);
          } else {
            element.appendChild(document.createTextNode("("))
            abbrElement.textContent = value;
            element.appendChild(abbrElement);
            element.appendChild(document.createTextNode(")"))
          }
          break;
        case MatchType.TEXT:
          element.appendChild(document.createTextNode(value))
          break;
      }
    }
  }
});
