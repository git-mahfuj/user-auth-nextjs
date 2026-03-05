import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URL

export const connectDB = async () => {
   try {

    await mongoose.connect(mongoURI as string);
    const connection = mongoose.connection
    connection.on("connected" , () => { 
        console.log("MongoDB Connected SuccessFully")
    })
    connection.on("error" , (error : Error)=> {
       console.log("MongoDB Connection error" ,  error)
       process.exit()
    })
   } catch (error) {
      console.log("Error While Connecting MongoDB",error)
   }
}