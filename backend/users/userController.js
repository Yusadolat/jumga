import asyncHandler from "express-async-handler";
import axios from 'axios'
import generateToken from '../utils/generateToken.js'
import User from "../users/userModel.js";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({ status: "Sucess", user
      })
    } else {
      res.status(401).send({status: "Failed", message: "Incorrect Login Details" });
      
    }
  })

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    password,
    phone_number,
    country,
    business_name,
    bank_name,
    bank_code,
    account_number,
    isMerchant
  } = req.body;
  

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send({status: "Failed", message: "User already exists"});
  }

  if (bank_name === ""){
    const freshUser = await User.create({
      fullname,
      email,
      password,
      phone_number,
      country,
      business_name,
      bank_name,
      bank_code,
      account_number,
    });
  
    if (freshUser) {
      res.status(201).json({
        _id: freshUser._id,
        fullname: freshUser.fullname,
        email: freshUser.email,
        isMerchant: freshUser.isMerchant,
        token: generateToken(freshUser._id),
      })
    
    } else {
      res.status(400).send({status: "Failed", message: error})
      
    }
  }else{
  //Create Subaccount

  var data =  JSON.stringify({
    "account_bank": bank_code,
    "account_number": account_number,
    "business_name": business_name,
    "business_email": email,
    "business_mobile": phone_number,
    "country": country,
    "split_type": "percentage",
    "split_value": 0.093
  })
  var config = {
    method: 'post',
    url: 'https://api.flutterwave.com/v3/subaccounts',
    headers: { 
      'Authorization': `Bearer ${process.env.LIVE_API_KEY}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(async function (response)  {
      //res.status(200).json(response.data.data);
 const {subaccount_id} = response.data.data
console.log(subaccount_id)
 const newUser = await User.create({
    fullname,
    email,
    password,
    phone_number,
    country,
    business_name,
    bank_name,
    bank_code,
    account_number,
    subaccount_id,
    isMerchant
  });
console.log(newUser)
  if (newUser) {
    res.status(201).json({
      
      token: generateToken(newUser._id),
      data: newUser
    }).catch(function (error) {
      res.status(400).json({status: "Failed", message: error.message});
    });
    
  }
  })
  .catch(function (error) {
    //console.log(error.response.data.message)
    res.status(400).send({status: "Failed", message: error.message});
  });
}
  
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById()
  
    res.status(200).json({user})
    
  } catch (error) {
    res.status(500).send({status: "Failed", message: error.message})
    
  }
  

})


export { loginUser, registerUser, getUserById };
