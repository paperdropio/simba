const db = require("../configs/db.config");
const formService = require("../services/forms.services");
const Form = require('../models/form.model');
const GeneralResult = require('../models/generalResult.model');

async function get(req, res, next) {
  try {
    const result = await formService.get(req.query.id);

    if (result) {
      res.json(new GeneralResult(true, result));
    }
    else {
      res.json(new GeneralResult(false));
    }
  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

async function createForm(req, res, next) {
  try {
    const model = new Form(req.body);
    const result = await formService.create(model);
    res.json(new GeneralResult(result.success, result.insertedId));
  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

async function saveForm(req, res, next) {
  try {
    const model = new Form(req.body);
    const result = await formService.save(model);

    res.json(new GeneralResult(result.success, result.totalModified));
  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

async function publishForm(req, res, next) {
  try {
    const id = req.body.id;
    const result = await formService.publish(id);

    res.json(new GeneralResult(result.success, result.totalModified, result.message));
  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  saveForm,
  createForm,
  publishForm
};