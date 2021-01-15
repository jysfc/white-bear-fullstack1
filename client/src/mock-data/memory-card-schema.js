const memoryCardSchema = {
   id: String, //hex#
   imagery: String, //top part of card
   answer: String, //bottom part of card
   userId: String, //hex UUID of user
   createdAt: Number, //timestamp
   //business logic used to filter
   nextAttemptAt: Number,
   lastAttemptAt: Number,
   totalSuccessfulAttempts: Number,
   level: Number,
};
