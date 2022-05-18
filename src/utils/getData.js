import app from "./axios.js"

const getData = async (url, param=undefined) => {
   
   if(param === undefined) {
      const { data, status } = await app.get(url);
   
      if (status !== 400 ) {
         return data
      }else {
         return console.log(`Error: ${status}`)
      }

   }else {
      const { data, status } = await app.get(url, {
         params: param
      });
      if (status !== 400 ) {
         return data
      }else {
         return console.log(`Error: ${status}`)
      }
   }

};

export default getData;

