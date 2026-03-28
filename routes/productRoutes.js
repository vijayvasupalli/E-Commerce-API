import express from "express";
import {products} from "../data/productsData.js";

const router=express.Router();

router.get("/",(req,res)=>{
  res.json(products);
});

router.post("/add",(req,res)=>{ // add Products
  const {prdtName,category,price}=req.body;

  if(!prdtName||!category||!price){
    return res.status(400).json({message:"Invalid Item Details to ADD"});
  }
  const newProduct={
    id:products.length+1,
    prdtName,
    category,
    price
  };
  products.push(newProduct);
  
  res.json({message:"New Item Added SuccessFully",newProduct});
});

router.put("/:id",(req,res)=>{ //update Product
  const id=Number(req.params.id);

  const {prdtName,category,price}=req.body;
  const product=products.find((p)=>p.id===id);
  if(!product){
    return res.status(404).json({message:"Product Not Found"});
  }
  if (prdtName !== undefined) product.prdtName = prdtName;
  if (category !== undefined) product.category = category;
  if (price !== undefined) product.price = price;

  res.json({message:"Item Details changed",
    product
  })
});

router.delete("/:id",(req,res)=>{ //Delete Product
  const id=Number(req.params.id);
  const indx=products.findIndex((p)=>p.id===id);

  if(indx==-1){
    return res.status(404).json({messsage:"Item Not Found"});
  }
  products.splice(indx,1);
  res.json({message:"Item Deleted SuccessFully"});
});

export default router;