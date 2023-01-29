import mongoose from "mongoose"

export const productsCollectionName="products";

export const ProductSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        require: true
    },
    title:
    {
        type: String,
        require: true      
    },
    image:
    {
        type: String,
        require: true       
    },
    price:
    {
        type: Number,
        require: true       
    }    
});

export const ProductModel = mongoose.model(productsCollectionName, ProductSchema);