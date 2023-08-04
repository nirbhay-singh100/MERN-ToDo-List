const mongoose = require("mongoose");
const conn = require("../db/conn");

const itemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    }
});

const Item = new mongoose.model("item", itemSchema);

module.exports = Item;
