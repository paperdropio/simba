
async function createForm(form) {
    let dbo = global.db;

    const result = await dbo.collection("forms").insertOne(form);

    console.log(result);
}