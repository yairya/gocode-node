import * as RestCall from "../utilities/restCall.js"

 const testText = await RestCall.GetText("http://localhost:8000/api/todo");
 console.log("response test text : " + testText);
