import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const accountNo = jsonRes.accountNo;
    const id = jsonRes.id;
    
    console.log(jsonRes)
    await client.connect();
    const collection = await client.db("personance").collection("accounts");
    const rows = await collection.findOne({userId: ObjectID(user._id), accountNo, id})
    client.close();
    
    res.status(200).json({message: 'success', rows: rows ? rows.rows : []})
}