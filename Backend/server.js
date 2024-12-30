import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api end points
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-stylish

app.get('/', (req,res) => {
    res.send('API WORKING')
}
)

//port number adding
app.listen(port, () => console.log("Server Started", port)) 
// mathi lekheko port chahi console maa conduct hunxa  
