const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---- POST ---- **/
/** tournament set up */
/** first pool INSERT tournament in tournament table
 * second part uses 2 Promise.all to INSERT pizzas into pizza table and judges into judge table **/
router.post('/create-tournament', (req, res) => {
  const numJudges = req.body.numJudges;
  const numPizzas = req.body.numPizzas;

  const firstQueryText = `INSERT INTO "tournament" (num_judges, num_pizzas)
  VALUES ($1, $2)
  RETURNING "id";`;

  pool
    .query(firstQueryText, [numJudges, numPizzas])
    .then((result) => {
      try {
        const tournamentId = result.rows[0].id;
        // data expected as string arrays
        const pizzaArray = req.body.pizzas;
        const judgeArray = req.body.judges;

        // empty array that the pool.queries can be pushed into
        const pizzaPromise = [];
        const judgePromise = [];

        // build pizzaPromise for Promise.all
        for (let i = 0; i < pizzaArray.length; i++) {
          const queryText = `INSERT INTO "pizza" (tournament_id, pizza_name)
          VALUES ($1, $2);`;
          const queryArray = [tournamentId, pizzaArray[i]];
          pizzaPromise.push(pool.query(queryText, queryArray));
        }

        // build judgePromise for Promise.all
        for (let i = 0; i < judgeArray.length; i++) {
          const queryText = `INSERT INTO "judge" (tournament_id, name)
          VALUES ($1, $2);`;
          const queryArray = [tournamentId, judgeArray[i]];
          judgePromise.push(pool.query(queryText, queryArray));
        }

        // nested Promise.all handles INSERT for pizza table and judges table
        Promise.all(pizzaPromise).then(() => {
          Promise.all(judgePromise).then(() => {
            res.sendStatus(201);
          });
        });
      } catch (err) {
        console.log('problem with secondary inserts', err);
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.log('problem with first insert', err);
      res.sendStatus(500);
    });
});

module.exports = router;
