import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authrouter from './routes/userRoutes.js'
import contentrouter from './routes/ContentRoutes.js'
import threadrouter from './routes/threadRoutes.js'
import bodyParser from "body-parser";

const app = express()
dotenv.config()
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())


//Routes
app.use('/api/auth',authrouter)
app.use('/api/content',contentrouter)
app.use('/api/thread',threadrouter)

app.get("/api/health", (req,res,next)=>{
    res.json("the diary page")
})

app.use((err,req,res,next)=> {
    console.log(err.stack)
    res.status(500).send('something is broken')
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})
