import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import * as RestCall from "../../utilities/restCall.js"
import * as ProductCollection from "../persistance/productsCollection.js"

dotenv.config();
const {USER, PASS, DB_HOST, DB_NAME, PORT} = process.env;
const mongoDB = "goCodeShop";
const uriBase="/api/eshop";

export const eshopController = () =>
{

const app = express();
app.use(express.json())
app.use(cors())


//------------------------------------------------------
app.get(uriBase + "/alive", async (req, res) => {
    console.log("get is alive request is camming");
    res.status(200).send({msg: "im alive"});
})

//------------------------------------------------------
app.get(uriBase + "/product", async (req, res) => {
    console.log("get product request is camming");
    try{
        let allProducts = [];
        await ProductCollection.ProductModel.find({}).then((dbResponse) => {
            console.log("succeed to get all docs");
            allProducts = dbResponse;
        });
        res.status(200).send(allProducts);
    }
    catch(e){
        console.log(e);
        res.status(400).send({error: e.Error});
    }})

//------------------------------------------------------
app.get(uriBase + "/product/:id", async (req, res) => {
    const {id} = req.params;
    console.log(`get single product ${id} request is camming`);
    try{
        let product = [];
        await ProductCollection.ProductModel.find({product_id : id}).then((dbResponse) => {
            console.log(`succeed to get product id ${id}`);
            product = dbResponse;
        });
        res.status(200).send(product);
    }
    catch(e){
        console.log(e);
        res.status(400).send({error: e.Error});
    }})

//------------------------------------------------------
app.delete(uriBase + "/product", async (req, res) => {
    console.log("delete all product request is camming");
    try{
        let dbRes = {};
        await ProductCollection.ProductModel.deleteMany({}).then((dbResponse) => {
            console.log("succeed to delete all docs"); 
            dbRes = dbResponse;
        });
        res.status(200).send({numOfDeletions: dbRes.deletedCount});
    }
    catch(e){
        console.log(e);
        res.status(400).send({error: e.Error});
    }
})

//------------------------------------------------------
app.post(uriBase + "/product/load", async (req, res) => {
    console.log("post request is camming");

    try{
        const allProducts = await RestCall.GetJson("https://fakestoreapi.com/products");
        console.log("allProducts: " + JSON.stringify(allProducts));
        const newProducts = [];

        let existsProducts = [];
        await ProductCollection.ProductModel.find({}).then((dbResponse) => {
            console.log("succeed to get all docs");
            existsProducts = dbResponse;
        });

        allProducts.forEach(element => {
            if( !element.id || !element.title || !element.image || !element.price){
                throw new Error("error in loaded product validation");
            }
            if(existsProducts.findIndex(p => p.product_id === element.id) != -1){
                console.log(`product with id: ${element.id} already exists!`)
            }
            else{
                const newProduct = new ProductCollection.ProductModel({
                    product_id: element.id,
                    title: element.title,
                    image: element.image,
                    price: element.price 
                });
                newProducts.push(newProduct);
            } 
        });

        if(newProducts.length > 0)
        {
            await ProductCollection.ProductModel.insertMany(newProducts)
                .then(() => console.log("Data inserted"))
                .catch((err) => {
                    console.log(err);
                    throw new Error(err)
                });
        }
        else{
            console.log("nothing to insert!")
        }
        res.status(200).send(newProducts);

    }catch(e){
        console.log(e);
        res.status(400).send({error: e.Error});
    }
})

//------------------------------------------------------

mongoose.set('strictQuery', true);
const dbUrl = `mongodb+srv://${USER}:${PASS}@${DB_HOST}/${DB_NAME}`;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) =>  {
        const msg = err? err : "succeed to connect";
        console.log("info: " + msg)
        if( !err)
        {
            app.listen(PORT, () => {
                console.log(`shop Controller listen to ${PORT}`)
            })
        }
    }
);

}