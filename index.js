const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname, "public");
app.use("/", express.static(public));
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(public + "/index.html"));
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server starts at ${port}`);
});
