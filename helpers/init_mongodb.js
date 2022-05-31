const mongoose = require('mongoose');
const session = require('express-session')
require('dotenv').config();

mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("Connected to MongoDB : ",process.env.URL)
    })
    .catch(error => console.log(error));

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db');
})


mongoose.connection.on('error',(error)=>{
    console.log('error : ', error);
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose connection is disconected');
})

process.on('SIGINT',async()=>{ //'SIGINT' event launched when u click ^c
    await mongoose.connection.close()
    process.exit(0)
})