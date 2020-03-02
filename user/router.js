const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// const user = {
//   email: req.body.email,
//   password: bcrypt.hashSync(req.body.password, 10)
// };

const router = new Router();

router.post("/user", async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    // newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
