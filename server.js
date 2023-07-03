const express  = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt');

const app = express();


/**
 * Logic to connect to MongoDB and create an ADMIN user
 * Need to have the mongodb up and running in your local machine
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () =>{
    console.log("Error while connecting to DB");
});

db.once("open", () =>{
    console.log("DB is connected");

    init();
})

async function init(){
    /**
     * Intialize the mongo db
     * Need to create ADMIN user
     */
    // encrypt the password
    

    let admin = await userModel.findOne({
        userId: "ram123"
    });

    if(admin){
        console.log("Admin user already exists");
        // console.log(bcrypt.hashSync("hemant", 8))
        return;
    }
    admin = await userModel.create({
        name: "Ram Patil",
        userId: "ram123",
        email: "ram@gmail.com",
        userType: "CUSTOMER",
        password: bcrypt.hashSync("hemant", 8)
    });

    console.log(admin);
    console.log("Admin created successfully");

}

app.listen(serverConfig.PORT, ()=>{
    console.log(`Server started on the port: ${serverConfig.PORT}` );
})

app.get('/', (req, res) =>{
    res.send("<h1>Welcome to the server: Idea Web App</h1>");
});
