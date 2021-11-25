import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const accounts = jsonRes.newAccounts;
    
    await client.connect();
    const collection = await client.db("personance").collection("users");
    await collection.updateOne({_id: ObjectID(user._id)}, {$set: {accounts}}, {upset: true})
    client.close();
    res.status(200).json({message: 'success'})
}