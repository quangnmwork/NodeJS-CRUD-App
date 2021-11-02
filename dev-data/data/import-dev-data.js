const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
  useNewUrlParser:true , 
  useCreateIndex:true , 
  useFindAndModify:false
}).then(connect => {
  console.log("connect success")
});

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
//IMPORT DATA
const importData = async () => {
     try{
        await Tour.create(tours);
     }
     catch(err) {
        console.log(err);
     }
}

//DELETE DATA FROM DB
const deleteData = async () => {
    try{
        await Tour.deleteMany();
     }
     catch(err) {
        console.log(err);
     }
}
process.argv[2] == '--import' ? importData():deleteData();