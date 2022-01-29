const express = require("express");
const { checkLoggedIn, checkToken } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
let router = express.Router();
require("dotenv").config();

const { User } = require("../../models/user_model");

router
  .route("/register")
  .post(async (req, res) => {
    try {
      //1st check email taken
      if (await User.emailTaken(req.body.email)) {
        return res.status(400).json({ message: "Sorry, email taken" });
      }

      //2nd creating instance of model
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      //3rd hash pasword and generate token
      const token = user.generateToken();
      const doc = await user.save();

      //4th send email

      //5th save user and send token with cookie
      res.cookie("x-access-token", token).status(200).send(getUserProps(doc));
    } catch (error) {
      res.status(400).json({ message: "Error", error: error });
    }
  })
  .get((req, res) => {});

router.route("/signin").post(async (req, res) => {
  try {
    //find user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    //compare password
    const compare = await user.comparePassword(req.body.password);
    if (!compare) return res.status(400).json({ message: "Bad Password" });

    //generate token
    const token = user.generateToken();

    //send response
    res.cookie("x-access-token", token).status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

router
  .route("/profile")
  .get(checkLoggedIn, grantAccess("readOwn", "profile"), async (req, res) => {
    try {
      const permission = res.locals.permission;
      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json(permission.filter(user._doc));

      res.status(200).send("ok");
    } catch (error) {
      return res.status(400).send(error);
    }
  });

const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    role: user.role,
  };
};

module.exports = router;
