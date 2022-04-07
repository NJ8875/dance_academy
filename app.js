// calling the modules
const express = require("express");
const app = express();
const path =require("path");
const fs=require('fs')
const mongoose = require('mongoose');
const bodyparser=require('body-parser') // we have to install this to accept the form from the website howrver it is not used in the code
// setting up port
const port=80;

// setting static for expreess
// app.use(express.static('static', options));
app.use("/static",express.static("static"));  // for serving the static files
app.use(express.urlencoded());


// for pug
app.set("view engine","pug") // setting view wngin pug
app.set("/views",path.join(__dirname,"views"));// setting the path of the views


//END points
app.get('/', (req, res)=>{
     res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
     res.status(200).render('contact.pug');
})

// This is to store the gaterd data in local storage (not the database)
// app.post("/submit",(req,res)=>{
//      pname= req.body.name;
//      page= req.body.age;
//      pgender= req.body.gender;
//      paemail= req.body.email;
//      pphone= req.body.phone;
//      let output_to_write=`name:${pname}\nage:${page}\ngender:${pgender}\nemail:${paemail}\nphone no:${pphone}`
//      fs.writeFileSync('output.txt',output_to_write);
//  const message={'message':"your resposde has been submited succesfully we wil get to you soon"}
//  res.status(200).render("contact.pug",message);
//  });

// to have the post request 
app.post('/submit', (req, res)=>{
     var mydata=new contact(req.body);
     mydata.save().then(()=>{
          // res.send("The form has been submited successfully")
          // alert("Your form has been submited succesfully")
          res.status(200).render('home.pug');
     }).catch(()=>{
          res.status(400).send("we are unable to submit Contact form The server is not Working")
     })
     // res.status(200).render('contact.pug');
})

// here i am linking mongoose
// moongoose initiate
mongoose.connect('mongodb://localhost/DanceContactForm', {useNewUrlParser: true, useUnifiedTopology: true});

// Mongoose connection verification
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("mongoose is running successfully");
});

// Defining mongoose schema as an form
const contactschema = new mongoose.Schema({
     name: String,
     age: String,
     gender: String,
     email: String,
     phone: String,

   });

//compiling schima in model
const contact = mongoose.model('contact', contactschema);





// start the server
app.listen(port,()=>{
console.log("The server has been started on port:"+port);
});