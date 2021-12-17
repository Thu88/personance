import { MongoClient } from 'mongodb';


export default function handler(req, res) {
  /* This API function makes it possible
       to sign up a new user */
    if (req.method === 'POST') {
        //Setup MongoClient
        const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const requestData = JSON.parse(req.body) //Get the user content from the POST request
        
        client.connect(err => {
          const collection = client.db("personance").collection("users");
          //Insert the user into the users collection
          collection.insertOne({
              username: requestData.username,
              password: requestData.password,
              accounts: []
          }).then(() => {
            client.close();
            res.status(200).json({message: 'success'});
          })
         
        });
    }

  }
  