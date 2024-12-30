import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import validator from "validator"
import stylishModel from "../models/stylishModel.js"

// API for adding Stylish
const addStylish = async (req,res) => {
    try{
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file
        
        //checking for all data to add stylish
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({sucess:false, message:"Missing Details"})

        }

        // validating email format
        if(!validator.isEmail(email)){
            return res.json({sucess:false, message:"Please enter a valid email"})
        }

        // validating strong password
        if(password.length < 8){
            return res.json({sucess:false,message:"Please enter a strong password"})
        }

        // hashing stylish password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const stylishData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newStylish = new stylishModel(stylishData)
        await newStylish.save()

        res.json({sucess:true, message:"Stylish Added"})
    } catch (error) {
        console.log(error)
        res.json({sucess:false, message:error.nessage})
    }
}

export { addStylish }

