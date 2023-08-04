require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Item = require("./models/todoItems");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/insertItem", async (req, res) => {
    try{
        const todoItem = new Item({
            itemName: req.body.itemName
        })
    
        const insertedItem = await todoItem.save();
        
        res.json(insertedItem);
        
    } catch(error){
        console.log(error);
    }
    
})

app.post("/deleteItem", async (req, res) => {
    try{
        const deletedItem = await Item.findOneAndDelete({_id: req.body._id});
        if(deletedItem){
            console.log("item deleted successfully");
        }
        res.json("item deleted succesfully");
    } catch(error){
        console.log(error);
    }
})

app.get("/getTodoList", async (req, res) => {
    const list = await Item.find();
    //console.log(list);
    res.json(list);
})

app.listen(port, (req, res) => {
    console.log("Server is running");
})

