import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';

export default NextAuth({
    providers: [
        CredentialsProvider({
            /* Use a credentials provider. A credentials provider is a custom provider made by the programmer.
               It is also possible to use providers such as fx google and facebook. This way a user can login with their google
               or facebook account  */
            name: 'Credentials',
            credentials: {      
                username: { label: "Username", type: "text", placeholder: "jsmith" },      
                password: {  label: "Password", type: "password" }    
            },
            async authorize(credentials, req) {
                /* This function is run when the user tries to log in */

                //Setup MongoClient
                const uri = "mongodb+srv:" + process.env.DATABASE_USER + ":" + process.env.DATABASE_PASSWORD + process.env.DATABASE_URL;
                const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
                
                let user;
                await client.connect();
                const collection = client.db("personance").collection("users");

                //Check if the credenital provided matches a user in the database
                user = await collection.findOne({
                    username: credentials.username,
                    password: credentials.password,

                });                
                console.log(user)

                //Return the user which then becomes availible in the session
                return user;
            }
        })
    ],
    pages: {
        //Use a custom sign in page instead of the default one provided by NextAuth
        signIn: '/signin'
    },
    callbacks: {
            async redirect({ url, baseUrl }) {     
                return url 
            },
            async session(session, token) {
                //Make the user object availible in the session
                session.user = token.user;
                return session;
            },
            //Configure the JSON Web Token to contain a user object with a username and password.
            //By default NextAuth only saves the username and email.
            async jwt(token, user, account, profile, isNewUser) {
                console.log("JWT User");
                console.log(user);
                if (user) {
                    token.user = user;
                }
                return token;
            }
    }
   
})