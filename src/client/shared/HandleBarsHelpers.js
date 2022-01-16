import Handlebars from "handlebars";

export  default function helpers(){
  Handlebars.registerHelper("link", function(text, options) {
    const attributes = [];
    Object.keys(options.hash).forEach(key => {
      const escapedKey = Handlebars.escapeExpression(key);
      const escapedValue = Handlebars.escapeExpression(options.hash[key]);
      attributes.push(escapedKey + '="' + escapedValue + '"');
    })
    const escapedText = Handlebars.escapeExpression(text);
    const escapedOutput ="<a " + attributes.join(" ") + ">" + escapedText + "</a>";
    return new Handlebars.SafeString(escapedOutput);
  });
}
