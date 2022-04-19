const Article = require("../Model/article.model");

const deleteOne = async (req, resp) => {
  const { id } = req.params;
  try {
    const [result] = await Article.deleteOneById(id);
    resp.json(result);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOne = async (req, res, next) => {
  const { description, link } = req.body;
  try {
    const [result] = await Article.createOne(description, link);
    req.id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
