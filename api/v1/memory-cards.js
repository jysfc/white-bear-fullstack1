// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");
const validateJwt = require("../../utils/validateJwt");

//@route        GET api/v1/memory-cards
//@desc         Get all memory cards for a user by search term and order
//@access       Private
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const { searchTerm, order } = req.query;
   const userId = req.user.id;
   let constructedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      { toSqlString: () => order }, // convert to string to work
   ])
      .then((memoryCards) => {
         //  console.log(memoryCards);
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfulAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });
         res.json(camelCaseMemoryCards);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

//@route        POST api/v1/memory-cards
//@desc         POST a memory card to the memory cards resource
//@access       Private
router.post("/", validateJwt, (req, res) => {});

module.exports = router;
