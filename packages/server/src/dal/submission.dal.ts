const { ObjectId } = require("mongodb");
import Submission from '../models/submission.model';
import DBConnection from '../models/dbConnection';

async function submitForm(submissionModel: Submission) {
    submissionModel._id = ObjectId();
    let dbo = <any>DBConnection.getInstance().db;
    const result = await dbo.collection("submissions").insertOne(submissionModel);

    return { success: result.acknowledged, insertedId: result.insertedId };
}

module.exports = {
    submitForm
}