const GeneralResult = require('../models/generalResult.model');

async function submitForm(req, res, next) {
  try {
    res.json("OK");

  } catch (err) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

module.exports = {
  submitForm
};