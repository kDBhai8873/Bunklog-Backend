import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())



import authRouter from './routes/auth.route.js'

app.use('/api/v1/auth/user', authRouter)

export default app