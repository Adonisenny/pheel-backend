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

app.use((err,req,res,next)=> {
    console.log(err.stack)
    res.status(500).send('something is broken')
})
//Routes
app.use('/api/auth',authrouter)
app.use('/api/content',contentrouter)
app.use('/api/thread',threadrouter)

app.get("/api/health", (req,res,next)=>{
    res.json("the diary page")
})

mongoose.connect("mongodb+srv://Phillip:Phillip@cluster0.lhbenjf.mongodb.net/ELECTRODIARY?retryWrites=true&w=majority")
.then(() => {
    if(process.env.PORT){
        app.listen(process.env.PORT, (req,res,next)=> {
            console.log('connected to database')
        })
    }
})
.catch((error) => {
    console.log(error)
})
