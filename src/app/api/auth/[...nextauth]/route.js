import nextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Patient from "@/app/models/users/patient";
import Medecin from "@/app/models/users/medecin";
import Labo from "@/app/models/users/labo";
import Centre from "@/app/models/users/centre";
import Admin from "@/app/models/users/admin";
import connectToDB from "@/app/database";
import bcrypt from "bcrypt"


async function login(credentials){
    try {
        await connectToDB();
        if(credentials.user === "patient"){
        const patient = await Patient.findOne({carte_id: credentials.carte_id});
        if(!patient){
          console.log("Wrond credentials")
          return
        }
        const isCorrect = await bcrypt.compare(credentials.password,patient.password);
         if(!isCorrect){
         console.log("Wrong Password")
         return
        }

        return {id : patient._id.toString() , role: "P"}
       
        }

        else if (credentials.user === "medecin"){
            const medecin = await Medecin.findOne({carte_id: credentials.carte_id});
            if(!medecin){
              console.log("Wrond credentials")
              return
            }
            const isCorrect = await bcrypt.compare(credentials.password,medecin.password);
             if(!isCorrect){
             console.log("Wrong Password")
             return
            }
    
            return {id : medecin._id.toString() , role: "M"}
        }

        else if (credentials.user === "labo"){
            const labo = await Labo.findOne({email: credentials.email});
            if(!labo){
              console.log("Wrond credentials")
              return
            }
            const isCorrect = await bcrypt.compare(credentials.password,labo.password);
             if(!isCorrect){
             console.log("Wrong Password")
             return
            }
    
            return {id : labo._id.toString() , role: "L"}
        }

        else if (credentials.user === "centre"){
            const centre = await Centre.findOne({email: credentials.email});
            if(!centre){
              console.log("Wrond credentials")
              return
            }
            const isCorrect = await bcrypt.compare(credentials.password,centre.password);
             if(!isCorrect){
             console.log("Wrong Password")
             return
            }
    
            return {id : centre._id.toString() , role: "C"}
        }

        else if (credentials.user === "admin"){
            const admin = await Admin.findOne({username: credentials.username});
            if(!admin){
              console.log("Wrond credentials")
              return
            }
            const isCorrect = await bcrypt.compare(credentials.password,admin.password);
             if(!isCorrect){
             console.log("Wrong Password")
             return
            }
    
            return {id : admin._id.toString() , role: "A"}
        }

        else {
            return
        }


    } catch (error) {
         console.log(error);
    
        return
    }
}


export const authOptions = {
    pages:{
        signIn: "/login"
       },

    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials){
            try {
                 const user = await login(credentials);
                 if(user){  
                  return user
                 }
                 else{
                    return
                 }
            } catch (error) {
                console.log(error)
                return
            }
          }
        })
    ],

    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id,
                token.role = user.role
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user.id = token.id,
                session.user.role = token.role
            }
            return session;
        }
    }
    }


const handler = nextAuth(authOptions);

export { handler as GET, handler as POST }