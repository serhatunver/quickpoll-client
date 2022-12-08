const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
app.use(compression());

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};
app.use(express.static("dist", options));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Vue app listening at http://localhost:${port}`);
});
