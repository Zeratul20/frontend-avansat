const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");

router.post("/users/login/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const password = req.body.password;
    const users = await knex("users").where({ username, password });
    if (users.length === 0) {
      res.status(400);
      throw new Error("User not found");
    }
    console.log("users", users);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/users/signUp", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const users = await knex("users").where({ username });
    if (users.length > 0) {
      res.status(400);
      res.send("User already exists");
      return;
    }
    await knex("users").insert({ username, password, email, role: "user" });
    res.send("User created");
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await knex("users");
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const users = await knex("users").where({ id });
    if (users.length != 1) {
      res.status(400);
      res.send("Can't find user");
      return;
    }
    res.send(users[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/users/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const users = await knex("users").where({ id });
    if (users.length != 1) {
      res.status(400);
      res.send("Can't find user");
      return;
    }
    await knex("users").update(req.body).where({ id });
    res.json({ message: `User ${id} updated` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
