import { MongoClient } from 'mongodb';


export default function handler(req, res) {
    if (req.method === 'POST') {
        const requestData = JSON.parse(req.body)
        const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
          const collection = client.db("personance").collection("users");
          collection.insertOne({
              username: requestData.username,
              password: requestData.password,
              accounts: []
          }).then(() => {
            client.close();
            res.status(200).json({message: 'success'});
          })
         
        });
    } else {
      // Handle any other HTTP method
    }

  }
  