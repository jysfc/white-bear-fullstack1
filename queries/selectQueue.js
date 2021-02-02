const selectQueue = `
SELECT
    *
FROM
    memory_cards
WHERE
    memory_cards.user_id = ?
ORDER BY 
    memory_cards.last_attempt_at ASC
LIMIT 10;
    `;
module.exports = selectQueue;
