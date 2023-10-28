const mongoose = require("mongoose");
const initData = require("C:/Desktop/Desktop/MajorProject/init/data.js");
const Listing = require("C:/Desktop/Desktop/MajorProject/models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlus";

main().then(() =>{
    console.log("connection to DB is successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}



const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6531383b912a016f9c34aa8b"}));
    await Listing.insertMany(initData.data);
    console.log("data waas init");
}

initDB()