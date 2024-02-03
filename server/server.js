import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from "./Routes/authRouter.js";
import Logger from './Middlewares/logger.js'
import passport from "passport";
import * as github_Auth from './OAuthSetup/githubPassportSetup.js'
import * as google_Auth from './OAuthSetup/googlePassportSetup.js'
import { errorHandler, notFoundPage } from "./Middlewares/errorHandler.js";
dotenv.config()



const app = express()
app.use(express.json())

//--------------------------------------
//--------------Connect DB--------------
//--------------------------------------
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => { console.log('DB connected successfully') })
    .catch((err) => {
        console.log("Error while connecting to the database")
    })

//--------------------------------------
//-------------Cookie Parse-------------
//--------------------------------------
app.use(cookieParser())


//--------------------------------------
//-----------------CORS-----------------
//--------------------------------------
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', //to be changed when deploying
    methods: 'GET,POST,PATCH,DELETE'
}))

//--------------------------------------
//----------------Logger----------------
//--------------------------------------
app.use(Logger)

//--------------------------------------
//----------------Routes----------------
//--------------------------------------
app.use(passport.initialize())

app.use('/auth/v1', authRouter)

//--------------------------------------
//-------------Error Handler------------
//--------------------------------------
app.use(notFoundPage)
app.use(errorHandler)


app.listen(process.env.PORT, () => {
    try {
        console.log(`App running successfully in port ${process.env.PORT}`)
    }
    catch (Error) {
        console.log('App does not work')
    }
})