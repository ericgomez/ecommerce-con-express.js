const fs = require("fs");

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys } = options;
  return Object.keys(objectKeys);
}

function getRenderedContent(content, options) {
  const keys = getKeysFromOptions(options);
  let contentString = content.toString();

  for (let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      options[key]
    );
  }

  return contentString;
}

function expressJxs(filePath, options, callback) {
  fs.readFile(filePath, function(err, content) {
    // En caso de un error
    if (err) {
      return callback(err);
    }

    const rendered = getRenderedContent(content, options);
    // en caso de que se correcto 
    return callback(null, rendered);
  });
}

module.exports = expressJxs;