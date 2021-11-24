import { useSession} from 'next-auth/client';
import { MongoClient } from 'mongodb';

export default function handler(req, res) {
    const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = req.body;
    client.connect().then(() => {
        const collection = client.db("personance").collection("users");
        collection.update(user, ...user.accounts = {
            1243412412: []
        })
    })
}