import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import {products} from '../module/Products.js'
import dotenv from "dotenv"
import * as RestCall from "../../utilities/restCall.js"
import * as ProductCollection from "../persistance/productsCollection.js"

dotenv.config();
const {PORT} = process.env;
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
    res.status(200).send(products);
})

//------------------------------------------------------
app.post(uriBase + "/product/load", async (req, res) => {
    console.log("post request is camming");

    try{
        const allProducts = await RestCall.GetJson("https://fakestoreapi.com/products");
        console.log("allProducts: " + JSON.stringify(allProducts));
        const newProducts = [];

        allProducts.forEach(element => {
            if( !element.id || !element.title || !element.image || !element.price){
                throw new Error("error in loaded product validation");
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
        ProductCollection.ProductModel.insertMany(newProducts)
            .then(() => console.log("Data inserted"))
            .catch((err) => {
                console.log(err);
                throw new Error(err)
            });
        res.status(200).send(newProducts);

    }catch(e){
        console.log(e);
        res.status(400).send({error: e.Error});
    }
})

//------------------------------------------------------
app.post(uriBase + "/product/load/:id", async (req, res) => {
    console.log("post request for single product load is camming");
    const {id} = req.params;
    const singleProduct = {};
    try{
        singleProduct = await RestCall.GetJson(`https://fakestoreapi.com/products/${id}`);
        console.log("singleProduct: " + JSON.stringify(singleProduct));

        if( !singleProduct.id || !singleProduct.title || !singleProduct.image || !singleProduct.price){
            throw new Error("error in loaded single product validation");
        }
        else{
            const newProduct = new ProductCollection.ProductModel({
                product_id: singleProduct.id,
                title: singleProduct.title,
                image: singleProduct.image,
                price: singleProduct.price
            });

            await newProduct.save();
            res.status(200).send(newProduct);
        }
    }
    catch(e){
        console.log(e);
        res.status(400).send({error: e});
    }

})


//------------------------------------------------------
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://127.0.0.1:27017/${mongoDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.listen(8080, function(){
    console.log(`shop Controller listen to 8080`)
});

}