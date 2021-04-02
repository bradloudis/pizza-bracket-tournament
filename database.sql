CREATE TABLE "tournament" (
	"id" SERIAL PRIMARY KEY,
	"num_judges" INT,
	"num_pizas" INT
);

CREATE TABLE "judge" (
	"id" SERIAL PRIMARY KEY,
	"tournament_id" INT REFERENCES "tournament",
	"name" VARCHAR (80)
);

CREATE TABLE "pizza" (
	"id" SERIAL PRIMARY KEY,
	"tournament_id" INT REFERENCES "tournament",
	"pizza_name" VARCHAR (100)
);

CREATE TABLE "pizza_score" (
	"id" SERIAL PRIMARY KEY,
	"pizza_id" INT REFERENCES "pizza",
	"judge_id" INT REFERENCES "judge",
	"tournament_id" INT REFERENCES "tournament",
	"cheese_score" INT,
	"sauce_score" INT,
	"crust_score" INT,
	"toppings_score" INT, 
	"overall_score" INT
);