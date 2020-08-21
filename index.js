const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const uploadImage = require("./helper");
const public = path.join(__dirname, "public");

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable("x-powered-by");
app.use(multerMid.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

app.use("/", express.static(public));
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(public + "/index.html"));
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server starts at ${port}`);
});
