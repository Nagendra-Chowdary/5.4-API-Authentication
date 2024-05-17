import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "nagendra";
const yourPassword = "nani";
const yourAPIKey = "a35e1d41-9455-4e38-98e7-f6bce36d3bd1";
const yourBearerToken = "38e53c43-f201-4298-8fe3-122f1d289686";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const response= await axios.get("https://secrets-api.appbrewery.com/random");
    const result =JSON.stringify(response.data);
    res.render("index.ejs",{content:result})
  }catch(error){
    res.render("index.ejs",{content:error.message})

  }
});

app.get("/basicAuth", async (req, res) => {

  
  try{ const response= await axios.get("https://secrets-api.appbrewery.com/all?page=2"
   , {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
  const result=JSON.stringify(response.data);
  console.log(result);
  res.render("index.ejs",{
    content:result
  })

}
catch(err){
res.render('index.ejs',{content:err.message})
}});

app.get("/apiKey",async  (req, res) => {
  try{
    const respone= await axios.get(`https://secrets-api.appbrewery.com/filter`
  ,
  {params: {
    score: 5,
    apiKey: yourAPIKey,
  }},
    );
const result =JSON.stringify(respone.data);
res.render("index.ejs",{content:result})
  }catch(err){
    res.render("index.ejs",{content:err.message});

  }
 
});

app.get("/bearerToken", async (req, res) => {
try{
  const response= await axios.get("https://secrets-api.appbrewery.com/secrets/42",
    {headers:{
      Authorization:`Bearer ${yourBearerToken}`
    }}
  ) ;
  const result= JSON.stringify(response.data);
  res.render("index.ejs",{content:result})
}
catch(err){
  res.render("index.ejs",{content:err.message})

}
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
