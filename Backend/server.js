import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api end points
app.get('/', (req,res) => {
    res.send('API WORKING')
}
)

//port number adding
app.listen(port, () => console.log("Server Started", port)) 
// mathi lekheko port chahi console maa conduct hunxa  
