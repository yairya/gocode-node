import * as RestCall from "../utilities/restCall.js"

const uriBase="/api/eshop";

 const test = await RestCall.GetText(`${uriBase}/todo`);
