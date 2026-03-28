import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app=express();


const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(cookieParser());
app.use(session(
  {
    secret:"mySecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{
      secure:false,
      maxAge:1000*60*60,
      httpOnly:true
    }
  }
));

app.use("/auth",authRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to E-Commerce API...\n" +
    "login: /auth/login\n" +
    "signup: /auth/signup\n" +
    "logout: /auth/logout\n" +
    "view products: /products\n" +
    "add product: /products/add\n" +
    "update product: /products/:id\n" +
    "delete product: /products/:id\n" +
    "add to cart: /cart/add\n" +
    "remove from cart: /cart/remove\n" +
    "checkout cart: /cart/checkout"
  );
});

app.listen(PORT,()=>{
  console.log(`Server Running on PORT:${PORT}`);
});