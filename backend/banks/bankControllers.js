import axios from 'axios'
import asyncHandler from "express-async-handler";




 

const getBankList = asyncHandler(async (req, res) => {
    let country = req.params.country
    var config = {
        method: 'get',
        url: `https://api.flutterwave.com/v3/banks/${country}`,
        headers: { 
          'Authorization': `Bearer ${process.env.API_KEY}`, 
          'Content-Type': 'application/json'
        },
      };
      
      axios(config)
    .then(function (response) {
        res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
  })


  export { getBankList };