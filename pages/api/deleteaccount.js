import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    /* This API function makes it possible
        to delete an account */
    
    //Setup MongoClient
    const uri = "mongodb+srv:" + process.env.DATABASE_USER + ":" + process.env.DATABASE_PASSWORD + process.env.DATABASE_URL;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    //Get the user and account to be deleted
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const accounts = jsonRes.newAccounts;
    
    await client.connect();

    //Delete the account
    const collection = await client.db("personance").collection("users");
    await collection.updateOne({_id: ObjectID(user._id)}, {$set: {accounts}}, {upset: true})
    client.close();
    res.status(200).json({message: 'success'})
}