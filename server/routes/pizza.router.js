const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET list of pizzas for tournament
 */

router.get('/all', (req, res) => {
  const queryText = 'SELECT * FROM "pizza";';

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('could not get pizzas!', err);
      res.sendStatus(500);
    });
});

module.exports = router;
