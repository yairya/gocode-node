
const GetText = async (address, setFunc) => {
    try{
      const response = await fetch (address);
      const resText = await response.text();
      setFunc(resText);
    }
    catch(err){
      console.log(`catch err: ${err}`);
    }
  }
  

  const printText = (text) => {
    console.log("response text : " + text);
  }

  GetText("http://localhost:8000/test", printText);