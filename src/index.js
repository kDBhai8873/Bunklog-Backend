import app from "./app.js";
import connectDb from "./db/index.js";
import dotenv from 'dotenv'
dotenv.config()


const port = 3000

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`app is listening on server ${port}`);
    })
}).catch((error) => {
    console.log(error);
    
})

app.get('/',(req,res) => {
    res.send("i am here")
})