const validator = require('../validations/validation');
const GeneralResult = require('../models/generalResult.model');

const saveForm = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email",
        "fields": "formFieldValidator"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send(new GeneralResult(false, err, "Validation failed"));
        } else {
            next();
        }
    });
}


const createForm = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send(new GeneralResult(false, err, "Validation failed"));
        } else {
            next();
        }
    });
}

module.exports = {
    saveForm,
    createForm
};