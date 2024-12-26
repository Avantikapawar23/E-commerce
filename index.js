const express = require("express");
const app = express();
const mongoose = require ("mongoose")
const path = require('path');

app.use(express.json());
console.log("index file is running");


app.use('/storage1', express.static(path.join(__dirname,'storage1')));
//import routes
const users = require('./routers/user_routers');
const admin = require('./routers/admin_routers');
const categary = require('./routers/categary_routers');
const product = require('./routers/product_routers');
const cart = require('./routers/cart_routers');
const wishlist = require('./routers/wishlist_router');

//middleware

app.use("/api/users",users);
app.use("/api/admin",admin);
app.use("/api/categary",categary);
app.use("/api/product",product);
app.use("/api/cart",cart);
app.use("/api/wishlist",wishlist);

mongoose.connect("mongodb+srv://HelloUser:avantika@cluster0.b9gb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() =>{
  })
    .catch((error)=>{
        console.error("Error connecting to MongoDB:",error)
    });
  

console.log("file is running");

const PORT=1801
app.listen(PORT, () => {
    console.log(`server is started at ${PORT}`);
})