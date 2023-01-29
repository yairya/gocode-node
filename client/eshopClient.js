import * as RestCall from "../utilities/restCall.js"
import dotenv from "dotenv"
dotenv.config();
const {PORT} = process.env;


const uriBase=`http://localhost:${PORT}/api/eshop`;
const testJson = await RestCall.GetJson(`${uriBase}/isalive`);
console.log(`msg: ${testJson.msg}`)