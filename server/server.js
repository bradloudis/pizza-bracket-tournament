const express = require('express');

const app = express();
const PORT = 5000;

/** --------- Require routes ------------ **/
const tournamentRouter = require('./routes/tournament.router');
const pizzaRouter = require('./routes/pizza.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** -------- Serve static files --------- **/
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/tournament', tournamentRouter);
app.use('/api/pizza', pizzaRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
