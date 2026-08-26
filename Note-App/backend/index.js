import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import noteRoutes from "./routes/note.route.js"
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";


const app = express()
dotenv.config()
const port = process.env.PORT
app.use(cors())

//Database Connection
try{
  mongoose.connect(process.env.MONGO_URL)
  console.log("connected to database")
}
catch(error){
  console.log("Error connecting to database ", error)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend")));

//Routing
app.use(express.json())
app.use("/api/v1/noteapp", noteRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})