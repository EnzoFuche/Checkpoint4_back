const mainRouter = require("express").Router();
const authRouter = require("./login.routes");
const userRouter = require("./user.routes");

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
