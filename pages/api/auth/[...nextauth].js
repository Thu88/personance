import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoClient } from 'mongodb';
import { useRouter } from "next/dist/client/router";
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {      
                username: { label: "Username", type: "text", placeholder: "jsmith" },      
                password: {  label: "Password", type: "password" }    
            },
            async authorize(credentials, req) {
                const uri = "mongodb+srv://thomasRoot:thmdikmfs89987IJBHIHBIU@personance.c4kx6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
                const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
                let test1;
                await client.connect();
                const collection = client.db("personance").collection("users");
                test1 = await collection.findOne({
                    username: credentials.username,
                    password: credentials.password,

                });                
                console.log(test1)
                console.log(test1)
                return test1
            }
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
           async redirect({ url, baseUrl }) {     
                return baseUrl 
            },
    }
   
})