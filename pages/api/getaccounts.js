import { useSession} from 'next-auth/client';
import { MongoClient, ObjectID } from 'mongodb';

export default async function handler(req, res) {
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const jsonRes = JSON.parse(req.body);
    const user = jsonRes.user
    
    console.log(user)
    await client.connect();
    const collection = await client.db("personance").collection("users");
    const mongoRes = await collection.findOne({_id: ObjectID(user._id)})
    client.close();
    res.status(200).json({message: 'success', accounts: mongoRes.accounts})
}