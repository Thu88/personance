import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    /* This API function makes it possible
        to update an account with new transactions */
    
    //Setup MongoClient
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

     //Get the user, account number, id and transactions from the POST request
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const account = jsonRes.account;
    const id = jsonRes.id;
    const rows = jsonRes.rows;
    
    console.log(jsonRes)
    await client.connect();
    
    //Update the account with the new transactions
    const collection = await client.db("personance").collection("accounts");
    await collection.updateOne({userId: ObjectID(user._id), accountNo: account, id}, {$set: { rows: rows}}, {upsert: true})
    client.close();
    res.status(200).json({message: 'success'})
}