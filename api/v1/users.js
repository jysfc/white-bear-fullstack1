// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

//@route        GET api/v1/users
//@desc         Get a valid user via email and password
//@access       Public

router.get("/", (req, res) => {
   db.query(selectUser("mike@gmail.com", "replace_me"), (err, dbRes) => {
      if (err) {
         console.log(err);
      } else {
         const user = toSafeParse(toJson(dbRes))[0];
         // const jsonRes = toJson(res);
         // const parsedRes = toSafeParse(jsonRes);
         // const firstObj = parsedRes[0];
         // const user = firstObj;
         console.log(user);
         res.json(user);
      }
   });
});

module.exports = router;
