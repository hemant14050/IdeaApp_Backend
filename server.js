const express  = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');

const app = express();


/**
 * Logic to connect to MongoDB and create an ADMIN user
 * Need to have the mongodb up and running in your local machine
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection ;

db.on("error", ()=>{
    console.log("Error while connecting to DB");
});

db.once("open", ()=>{
    console.log("DB is connected");

    init();
})

async function init(){
    /**
     * Intialize the mongo db
     * Need to create ADMIN user
     */

    let admin = await userModel.findOne({
        userId: "hemant14050"
    });

    if(admin){
        console.log("Admin user already exists");
    }
    else{
        admin = await userModel.create({
            name: "Hemant Patil",
            userId: "hemant14050",
            email: "hemant@gmail.com",
            userType: "ADMIN",
            password: "hemant"
        });
    
        console.log(admin);
        console.log("Admin created successfully");
    }
}

app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}` );
})
