import express from "express";
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors())

app.get("/test", async (req, res) => {
    console.log("request is camming");
    res.send("this is test");
})

app.listen(8000, function(){
    console.log("listen to 8000")
});
