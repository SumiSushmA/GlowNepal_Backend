import express from 'express'
import { addStylish } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-stylish', upload.single('image'), addStylish)

export default adminRouter