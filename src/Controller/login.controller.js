const jwt = require("jsonwebtoken");
const { User } = require("../Model");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const [result] = await User.findOneByEmail(email);
  if (result.length === 0) {
    res.status(400).send("email ou mot de passe incorrect");
  } else {
    const validPassword = await User.verifyPassword(
      password,
      result[0].password
    );
    if (validPassword) {
      console.log(result[0]);
      delete result[0].password;
      req.user = result[0];
      next();
    } else {
      res.status(400).send("email ou mot de passe incorrect");
    }
  }
};

const createToken = (req, res) => {
  const token = jwt.sign(req.user, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  res
    .status(200)
    .cookie("token", token, { httpOnly: true, maxAge: 900000 })
    .json(req.user);
};

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      }
      req.user = decoded;
      return next();
    });
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = {
  login,
  createToken,
  verifyToken,
};
