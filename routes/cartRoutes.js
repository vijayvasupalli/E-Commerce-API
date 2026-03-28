import express from "express";
import {isAuthenticated} from "../middleware/authMiddleware.js";
import { products } from "../data/productsData.js";

const router=express.Router();

//router.use(isAuthenticated); //when user entered..another session has to be created for user for Cart Purpose..so user Middleware need to register !

router.post("/add",(req,res)=>{ //to add to Cart
  const id=Number(req.body.id);
  if(!id){
    return res.status(400).json({message:"Product Not Found"});
  }
  if(!req.session.cart){
    req.session.cart=[]; //so session cart has to be used for user
  }
  const matchItem=req.session.cart.find((item)=>item.id===id);
  if(matchItem){
    matchItem.quantity+=1;
  }
  else{
    req.session.cart.push({id,quantity:1});
  }
  res.json({
    message: "Item added to cart",
    cart: req.session.cart
  });
});

router.post("/remove",(req,res)=>{ //remove from cart
  const id=Number(req.body.id);
  if(!id){
    return res.status(400).json({message:"Product Not Found"});
  }
  req.session.cart = (req.session.cart||[]).filter((item)=>item.id!==id); //this filter will create another duplicate array with condition as provided
  res.json({message:"Item removed from cart",cart:req.session.cart});
});

router.get("/checkout",(req,res)=>{ //checkItems in Cart
  
  const cart=req.session.cart ||[];
  if(cart.length===0){
    return res.json({message:"Cart is Empty !"});
  }

  let total=0;
  const myCart=[];
  cart.forEach((item) => {
    const product=products.find((p)=>p.id===Number(item.id));
    if(product){
      const itemPrice=product.price*item.quantity;
      total+=itemPrice;
      myCart.push({
        productID:product.id,
        name:product.prdtName,
        quantity:item.quantity,
        price:product.price,
        itemTotal:itemPrice
      });
    }
  });
  res.json({
    message: "Checkout successful",
    items: myCart,
    totalPrice: total
  });
});


export default router;