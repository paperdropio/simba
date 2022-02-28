const validator = require('../validations/validation');

const createForm = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email",
        "fields": "required|array|formFieldValidator"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    createForm
};