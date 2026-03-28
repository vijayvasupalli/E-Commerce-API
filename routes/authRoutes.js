import express from "express";
import { myUsers } from "../data/userData.js";

const router=express.Router();

router.post("/login",(req,res)=>{
  const {username,password}=req.body;
  const users=myUsers.find((user)=>{
    return user.username===username && user.password===password;
  });
  if(!users){
    return res.status(401).json({message:"Invalid Credentials (or) Create NEW USER"});
  }
  req.session.user={
    username:users.username //session need to register for user
  };
  console.log(req.session);
  res.json({message:"Login SuccessFull"});
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  
  const existingUser = myUsers.find(
    user => user.username === username //checking if user exists or not
  );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }
  const newUser = {
    username,
    password
  };

  myUsers.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser
  });
});


router.post('/logout',(req,res)=>{
  req.session.destroy(); //when user logout ,session got destroyed
  res.json({message:"Logged out SuccessFull"});
});

export default router;
