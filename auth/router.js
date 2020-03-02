const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const bcrypt = require("bcrypt");
const User = require("../user/model");
const auth = require("./middleware");

const router = new Router();

// how I did it, going to continue with reader example one below
// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const userId = { email, password };
//     if (userId.email !== undefined && userId.password !== undefined) {
//       console.log(userId);
//       const jwt = toJWT(userId);
//       res.send({
//         jwt: jwt
//       });
//     } else {
//       res.status(400).send({
//         message: "Please supply a valid email and password"
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// reader example
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    // 1. find user based on email address
    // 2. use bcrypt.compareSync to check the password against the stored hash
    // 3. if the password is correct, return a JWT with the userId of the user (user.id)

    // 1. find user based on email address
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(entity => {
        // console.log("i am logging entity", entity);
        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });

    // reader example before promise chaining
    // res.send({
    //   jwt: toJWT({ userId: 1 })
    // });
  }
});

router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`
  });
});

module.exports = router;
