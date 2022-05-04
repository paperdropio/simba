import validator from '../validations/validation';
import GeneralResult from '../models/generalResult.model';
import { resourceLimits } from 'worker_threads';
const _ = require('lodash');

const saveForm = async (req: any, res: any, next: any) => {
    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email",
        "fields": "formFieldValidator"
    }

    await validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send(new GeneralResult(false, err, "Validation failed"));
        } else {
            next();
        }
    });
}


const createForm = async (req: any, res: any, next: any) : Promise<void> => {
    const validationRule = {
        "name": "required|string",
        "header": "required|string",
        "description": "required|string",
        "email": "required|string|email"
    }

    await validator(req.body, validationRule, {}, (err:any, status: any) => {
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