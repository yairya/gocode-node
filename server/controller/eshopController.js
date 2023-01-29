import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import {products} from '../module/Products.js'
import dotenv from "dotenv"
import * as RestCall from "../../utilities/restCall.js"

dotenv.config();
const {PORT} = process.env;
const mongoDB = "goCodeShop";
const uriBase="/api/eshop";

export const eshopController = () =>
{

const app = express();
app.use(express.json())
app.use(cors())
mongoose.set('strictQuery', false);



app.get(uriBase + "/isalive", async (req, res) => {
    console.log("get is alive request is camming");
    res.status(200).send({msg: "im alive"});
})

app.get(uriBase + "/product", async (req, res) => {
    console.log("get product request is camming");
    res.status(200).send(products);
})

app.post(uriBase + "/product/copy", async (req, res) => {
    console.log("post request is camming");
    const todo = {...req.body};

    const productsFromWeb = RestCall.GetJson()

    const index =  ToDoList.list.indexOf(item => item.id === todo.id);
    console.log("index: " + index);

    if(ToDoList.list.indexOf(item =>  item.id === todo.id) != -1)
    {
        console.log("exists");
        res.status(400).send({msg:"item already exists!"});
    }

    ToDoList.list.push(todo)
    res.status(200).send(todo);
})




mongoose.connect(`mongodb://localhost:27017/${mongoDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.listen(PORT, function(){
    console.log(`shop Controller listen to ${PORT}`)
});

}