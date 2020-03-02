const { Router } = require("express");
const Image = require("./model");

const router = new Router();

router.get("/image", async (req, res, next) => {
  try {
    const limit = req.query.limit || 25;
    const offset = req.query.offset || 0;
    const images = await Image.findAll({ limit, offset });
    if (images) {
      res.json(images);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

router.post("/image", async (req, res, next) => {
  try {
    const newImage = await Image.create(req.body);
    res.status(201).json(newImage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
