import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())



//ROUTERS IMPORT
import authRouter from './routes/auth.route.js'
import subjectRouter from './routes/subject.route.js'

//ROUTERS INITIALIZATION
app.use('/api/v1/auth/user', authRouter)
app.use('/api/v1/subjects', subjectRouter)


export default app