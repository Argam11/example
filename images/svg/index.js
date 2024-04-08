const fs = require("fs");

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    if (file === "index.js") return;

    fs.readFile(__dirname + "/" + file, "utf-8", function (err, result) {
      if (err) {
        return console.log(err);
      }

      result = result
        .split("<")
        .map((d) => {
          if (d.startsWith("svg")) {
            if (d.includes("fill")) {
              return d
                .split(" ")
                .map((d2) => {
                  if (d2.startsWith("fill")) {
                    return 'fill="currentColor"';
                  }
                  return d2;
                })
                .join(" ");
            } else {
              return d.replace("svg", 'svg fill="currentColor"');
            }
          }

          return d;
        })
        .join("<");

      fs.writeFile(__dirname + "/" + file, result, function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });
});
