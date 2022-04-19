const userRouter = require("express").Router();
const { User } = require("../Model");
const { usersController } = require("../Controller").userController;
const { verifyAccessToken } = require("../Controller").loginController;

userRouter.get("/", verifyAccessToken, async (req, res) => {
  try {
    const [results] = await User.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await User.findOneById(id);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post(
  "/",
  userController.validateDataCreateUser,
  userController.createOneUser,
  userController.getOneUserById,
  (req, res) => {
    const { name, email, password } = req.body;
    res.status(201).json({ name, email, password });
  }
);

userRouter.delete("/:id", usersController.deleteOne);

module.exports = userRouter;
