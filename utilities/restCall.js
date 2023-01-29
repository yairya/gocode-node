
export const GetText = async (address) => {
    try{
      const response = await fetch (address);
      const resText = await response.text();
      return resText;
    }
    catch(err){
      console.log(`catch err: ${err}`);
    }
  }
  
  export const GetJson = async (address, setFunc) => {
    try{
      const response = await fetch (address);
      const resJson = await response.json();
      setFunc(resJson);
    }
    catch(err){
      console.log(`catch err: ${err}`);
    }
  }
  