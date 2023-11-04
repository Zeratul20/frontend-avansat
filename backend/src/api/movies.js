const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await knex("movies");
    res.send(movies);
  } catch (error) {
    next(error);
  }
});
router.get("/movies/:movieId", async (req, res, next) => {
  try {
    const id = req.params.movieId;
    const movies = await knex("movies").where({ id });
    res.send(movies);
  } catch (error) {
    next(error);
  }
});
router.put("/movies/:movieId", async (req, res, next) => {
  try {
    const id = req.params.movieId;
    const movies = await knex("movies").where({ id });
    if (movies.length != 1) {
      res.status(400);
      res.send("Can't find movie");
      return;
    }

    console.log("Movies: ", movies);

    await knex("movies")
      .where({ id })
      .update(req.body)
      .then((response) => res.json(response.data));
  } catch (error) {
    next(error);
  }
});
router.delete("/movies/:movieId", async (req, res, next) => {
  try {
    const id = req.params.movieId;
    const movies = await knex("movies").where({ id });
    if (movies.length < 1) {
      res.status(400);
      res.send("Can't find movie");
      return;
    }
    await knex("comments").where({ movieId: id }).delete();
    await knex("movies").where({ id }).delete();
    res.json({ message: "Movie deleted" });
  } catch (error) {
    next(error);
  }
});
router.post("/movies", async (req, res, next) => {
  try {
    const { name } = req.body;
    const users = await knex("movies").where({ name });
    if (users.length > 0) {
      res.status(400);
      res.send("Movie already exists");
      return;
    }
    req.body.likes = 0;
    await knex("movies")
      .insert(req.body)
      .then((response) => res.json(response.data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
