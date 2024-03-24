function convertToHTML(description) {
  var output = "";
  const lines = description.split("\n");
  lines.forEach((line) => {
    if (line.trim().startsWith("*")) {
      output += "<li>" + line.trim().substring(2) + "</li>";
    } else {
      output += line ? "<p>" + line + "</p>" : "<br>";
    }
  });
  return output;
}

export default convertToHTML;
