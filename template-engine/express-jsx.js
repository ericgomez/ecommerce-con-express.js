const fs = require("fs");

function getRenderedContent(content, options) {
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