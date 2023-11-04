const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");

router.get("/movies/:movieId/comments", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    // const comments = await knex("comments").select().where({ movieId });
    const comments = await knex("comments")
      .select("comments.id", "message", "userId", "users.username")
      .where({ movieId })
      .join("users", "users.id", "=", "comments.userId");
    console.log("comments", comments);
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/movies/comments", async (req, res, next) => {
  try {
    await knex("comments")
      .insert(req.body)
      .then((response) => res.status(200));
    const { movieId } = req.body;
    const comments = await knex("comments")
      .select("comments.id", "message", "userId", "users.username")
      .where({ movieId })
      .join("users", "users.id", "=", "comments.userId");
    console.log("comments", comments);
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/movies/:movieId/comments/:commentId",
  async (req, res, next) => {
    try {
      const { commentId, movieId } = req.params;
      const comments = await knex("comments").where({ id: commentId, movieId });
      if (comments.length < 1) {
        res.status(400);
        res.send("Can't find comment");
        return;
      }
      await knex("comments").where({ id: commentId }).delete();
      res.json({ message: `Comment ${commentId} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/movies/:movieId/comments/:commentId", async (req, res, next) => {
  try {
    const { commentId, movieId } = req.params;
    const comments = await knex("comments").where({ id: commentId, movieId });
    if (comments.length != 1) {
      res.status(400);
      res.send("Can't find comment");
      return;
    }

    await knex("comments")
      .where({ id: commentId })
      .update(req.body)
      .then((response) => res.json(response.data));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
