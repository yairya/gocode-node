import express from "express";
import cors from "cors"
import {ToDoList} from '../module/ToDoList.js'


export const todoController = () =>
{

const app = express();
app.use(express.json())
app.use(cors())

const uriBase="/api";
app.get(uriBase + "/todo", async (req, res) => {
    console.log("get request is camming");
    res.status(200).send(ToDoList.list);
})

app.post(uriBase + "/todo/add", async (req, res) => {
    console.log("post request is camming");
    const todo = {...req.body};

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

app.listen(8000, function(){
    console.log("controller listen to 8000")
});

}