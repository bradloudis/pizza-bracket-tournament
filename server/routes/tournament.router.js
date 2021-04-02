const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---- POST ---- **/
/** tournament set up */
router.post('/new-tournament', (req, res) => {
  console.log('you hit the route!');
});

module.exports = router;
