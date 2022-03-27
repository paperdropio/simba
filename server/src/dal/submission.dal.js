const { ObjectId } = require("mongodb");

async function submitForm(submissionModel) {
    let dbo = global.db;
    submissionModel._id = ObjectId();
    console.log(submissionModel);
    const result = await dbo.collection("submissions").insertOne(submissionModel);

    return { success: result.acknowledged, insertedId: result.insertedId };
}

module.exports = {
    submitForm
}