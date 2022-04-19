const { User } = require("../Model");

const validateDataCreateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (await User.emailAlreadyExists(email)) {
    res.status(400).send("Email already used");
  } else if (!User.validatePassword(password)) {
    res.status(400).send("Password invalid");
  } else {
    next();
  }
};

const createOneUser = async (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;
  let defaultRole;
  if (role === undefined || role === null || role.length === 0) {
    defaultRole = 0;
  } else {
    defaultRole = role;
  }
  console.log(firstname, lastname, email, password, defaultRole);
  const hashedPassword = await User.hashPassword(password);
  try {
    const [[userWithEmail]] = await User.findOneByEmail(email);
    if (!userWithEmail) {
      const [result] = await User.createOne({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: defaultRole,
      });
      const [[userCreated]] = await User.findOneById(result.insertId);
      res.status(201).json(userCreated);
      next();
    } else {
      res.status(400).send("Email already used");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneUserById = async (req, res) => {
  const { id } = req;
  try {
    const [results] = await User.findOneById(id);
    res.status(201).json(results[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const [results] = await User.findOneById(id);

      if (results.length > 0) {
        await User.deleteOneById(id);
        return res.sendStatus(204);
      }
      return res.status(404).send("User not found");
    }
    return res.status(400).send("Bad request");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const verifyCredentials = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const [results] = await User.findOneByEmail(email);
    if (results.length === 0) {
      res.status(400).send("Bad Credential");
    } else {
      const { hashPassword } = results[0];
      const validPassword = await User.verifyPassword(password, hashPassword);
      if (!validPassword) {
        res.status(400).send("Bad Credential");
      } else {
        res.status(200).send("Authorised connection");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  verifyCredentials,
  validateDataCreateUser,
  createOneUser,
  getOneUserById,
  deleteOne,
};
