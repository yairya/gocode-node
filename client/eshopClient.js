import * as RestCall from "../utilities/restCall.js"
import dotenv from "dotenv"
dotenv.config();
const {PORT} = process.env;


const uriBase=`http://localhost:${PORT}/api/eshop`;
const testJson = await RestCall.GetJson(`${uriBase}/alive`);
console.log(`msg: ${testJson.msg}`)
// const testJson = await RestCall.GetJson(`${uriBase}/product`);
// console.log(`msg: ${testJson[0].msg}`)

const productJson = await RestCall.GetJson(`${uriBase}/product/load/1`);
console.log(`msg: ${productJson}`)