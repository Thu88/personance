import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    /* This API function makes it possible
        to retreive all transactions from an account */

    //Setup MongoClient
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    //Get the user, account number and id from the POST request
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    const accountNo = jsonRes.accountNo;
    const id = jsonRes.id;

    console.log(jsonRes)
    await client.connect();

    //Find the document containing the correct account from the accounts collection
    const collection = await client.db("personance").collection("accounts");
    const rows = await collection.findOne({userId: ObjectID(user._id), accountNo, id})
    client.close();

    //Send the transaction rows from the account back to the client
    res.status(200).json({message: 'success', rows: rows ? rows.rows : []})
}