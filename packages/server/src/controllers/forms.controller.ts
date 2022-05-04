const formService = require("../services/forms.services");
var httpContext = require('express-http-context');
const { v4: uuid } = require('uuid');
import Form from '../models/form.model';
import GeneralResult from '../models/generalResult.model';


export async function get(req: any, res: any, next: any) {
  try {
    const result = await formService.get(req.query.id);

    if (result) {
      httpContext.set('uRequestId', uuid());
      res.json(new GeneralResult(true, result));
    }
    else {
      res.json(new GeneralResult(false));
    }
  } catch (err:any) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

export async function createForm(req: any, res: any, next: any) {
  try {
    const model = new Form(req.body);
    const result = await formService.create(model);
    res.json(new GeneralResult(result.success, result.insertedId));
  } catch (err:any) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

export async function saveForm(req: any, res: any, next: any) {
  try {
    const model = new Form(req.body);
    console.log(model);
    const result = await formService.save(model);

    res.json(new GeneralResult(result.success, result.totalModified));
  } catch (err:any) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}

export async function publishForm(req: any, res: any, next: any) {
  try {
    const id = req.body.id;
    const result = await formService.publish(id);

    res.json(new GeneralResult(result.success, result.publishSecret, result.message));
  } catch (err:any) {
    console.error(`Caught exception`, err.message);
    next(err);
  }
}