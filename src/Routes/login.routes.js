const loginRouter = require("express").Router();
const { login, createToken } = require("../Controller").loginController;
const { verifyCredentials } = require("../Controller").userController;

loginRouter.post("/login", login, createToken);
loginRouter.post("/verifyCredentials", verifyCredentials);

module.exports = loginRouter;
