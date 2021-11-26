import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const account = jsonRes.account;
    const id = jsonRes.id;
    const rows = jsonRes.rows;
    
    console.log(jsonRes)
    await client.connect();
    const collection = await client.db("personance").collection("accounts");
    await collection.updateOne({userId: ObjectID(user._id), accountNo: account, id}, {$set: { rows: rows}}, {upsert: true})
    client.close();
    res.status(200).json({message: 'success'})
}