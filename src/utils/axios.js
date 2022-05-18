import axios from "axios";

const KEY = process.env.KEY;

const app = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json;charset=utf-8',
   },
   params: {
      'api_key': KEY,
      //"language": "es",
   }
});

export default app;