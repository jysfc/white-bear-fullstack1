// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse, toHash } = require("../../utils/helpers");
const bcrypt = require("bcrypt");

//@route        GET api/v1/users
//@desc         Get a valid user via email and password
//@access       Public

router.get("/", (req, res) => {
   db.query(selectUser("mike@gmail.com", "replace_me"))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         // const jsonRes = toJson(res);
         // const parsedRes = toSafeParse(jsonRes);
         // const firstObj = parsedRes[0];
         // const user = firstObj;
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

//@route        POST api/v1/users
//@desc         Create a new user
//@access       Public
router.post("/", async (req, res) => {
   const user = req.body;
   user.password = await toHash(user.password);
   console.log(user);
});

module.exports = router;
