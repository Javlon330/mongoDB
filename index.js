// const express = require('express')
// const Roi = require('joi');
// const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDBga ulanish amalga oshdi...')
    })
    .catch((err) => {
        console.error("MongoDBga ulanish amalga oshmadi...")
    });


const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String,
})

const inventorySchema = new  mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String
}, {collection: 'inventory'});


const Inventory = mongoose.model('Inventory',inventorySchema);

async function getInventoryItems () {

    return await Inventory
        .find()
        .or([{qty: { $lte: 50}}, {item: /.*l.*/}])
        .sort({ qty: -1})
}

async function run(){
    const items = await getInventoryItems();
    console.log(items);
}

run();
