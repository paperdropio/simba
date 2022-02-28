const db = require("../configs/db.config");
const formService = require("../services/forms.services");

async function get(req, res, next) {
  try {
    res.json(formService.get(req.query.id));
  } catch (err) {
      console.error(`Caught exception`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    let result = await formService.create(req.body.form);

    res.json(result);
  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create
};