import express, {Request,Response} from "express";

const app = express();
const port :5000 = 5000;

app.get("/", (req:Request,res:Response)=>{
    res.send("Hello!");
})
app.listen(port, ()=>{
    console.log(`app start on port ${port}`);
    console.log(`open in browser http://localhost:${port}`);
})